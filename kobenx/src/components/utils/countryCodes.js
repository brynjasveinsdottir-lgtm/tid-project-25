export const countryNameToCode = {
    Argentina: "AR",
    Australia: "AU",
    Austria: "AT",
    Belgium: "BE",
    Brazil: "BR",
    Canada: "CA",
    Chile: "CL",
    China: "CN",
    Colombia: "CO",
    Czechia: "CZ",
    "Czech Republic": "CZ",
    Denmark: "DK",
    Egypt: "EG",
    EU: "EU",
    Finland: "FI",
    France: "FR",
    Germany: "DE",
    Iceland: "IS",
    India: "IN",
    Ireland: "IE",
    Italy: "IT",
    Japan: "JP",
    Korea: "KR",
    Mexico: "MX",
    Morocco: "MA",
    Netherlands: "NL",
    "New Zealand": "NZ",
    Norway: "NO",
    Poland: "PL",
    Portugal: "PT",
    "South Africa": "ZA",
    "South Korea": "KR",
    Spain: "ES",
    Sweden: "SE",
    Switzerland: "CH",
    Thailand: "TH",
    "United Kingdom": "GB",
    UK: "GB",
    "United States": "US",
    USA: "US",
  };
  
  export function getCountryCode(input) {
    if (!input) return null;
    return countryNameToCode[input.trim()] || null;
  }

  export const countrySelectOptions = Array.from(
    new Map(
      Object.entries(countryNameToCode)
        .map(([name, code]) => [code, name])
    ).values()
  ).sort();