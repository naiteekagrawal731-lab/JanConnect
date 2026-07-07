package com.example.JanConnect.dtos.requestDtos;

public record GeoRequestDTO(String village, String ward, String district, String country) {

    // Formats the address from specific (village) to broad (country)
    public String toQueryString() {
        return String.format("%s, %s, %s, %s", village, ward, district, country)
                .replaceAll(", , ", ", "); // Clean up any empty fields
    }
}