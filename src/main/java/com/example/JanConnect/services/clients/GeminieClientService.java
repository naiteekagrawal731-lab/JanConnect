package com.example.JanConnect.services.clients;

import com.example.JanConnect.records.InlineData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;
import tools.jackson.databind.JsonNode;

import java.io.IOException;
import java.time.Duration;
import java.util.*;

@Service
@Slf4j
public class GeminieClientService {

    private final WebClient geminiWebClient;
    private final String apiKey;

    public GeminieClientService(WebClient.Builder builder,@Value("${gemini.api.key}") String apiKey){
        geminiWebClient = builder
                .baseUrl("https://generativelanguage.googleapis.com/v1")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        this.apiKey = apiKey;
    }

    public Mono<JsonNode> sendPrompt(String prompt, List<MultipartFile> attachments) throws IOException {
        log.info("Getting geminie report");
        List<Object> parts = new ArrayList<>();
        parts.add(Map.of("text",prompt));

        if(attachments != null){
            for(MultipartFile attachment : attachments){
                String base64Encoded = Base64.getEncoder().encodeToString(attachment.getBytes());
                parts.add(Map.of("inlineData",new InlineData(attachment.getContentType(),base64Encoded)));
            }
        }


        Map<Object,Object> promptMap =
                Map.of("contents",List.of(
                        Map.of("parts",parts))
                );

        return geminiWebClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/gemini-2.5-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build()
                )
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(promptMap)
                .retrieve()
                .onStatus(
                        HttpStatusCode::is4xxClientError,
                        clientResponse -> {
                            log.error(clientResponse.toString());
                            return clientResponse.createException();
                        }
                )
                .bodyToMono(JsonNode.class)
                .retryWhen(
                        Retry.backoff(10, Duration.ofSeconds(2))
                                .filter(throwable ->
                                        throwable instanceof WebClientResponseException ex
                                                && ex.getStatusCode().value() == 503
                                )
                )
                .doOnNext(body -> log.info("Gemini Response: {}", body));

    }


}
