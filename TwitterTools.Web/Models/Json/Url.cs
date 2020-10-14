using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models.Json
{

    public class Url
    {
        [JsonPropertyName("url")]
        public string UrlValue { get; set; }

        [JsonPropertyName("expanded_url")]
        public string ExpandedUrl { get; set; }

        [JsonPropertyName("display_url")]
        public string DisplayUrl { get; set; }

        [JsonPropertyName("indices")]
        public List<int> Indices { get; set; }

    }

}
