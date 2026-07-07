package com.example.JanConnect.records;

import lombok.Builder;

@Builder
public record Coordinates(double latitude, double longitude) {
}
