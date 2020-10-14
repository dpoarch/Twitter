using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models.Json
{

    public class Hashtag
    {
        [JsonPropertyName("text")]
        public string Text { get; set; }

        [JsonPropertyName("indices")]
        public List<int> Indices { get; set; }

    }

}
