using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models.Json
{

    public class UserMention
    {
        [JsonPropertyName("screenname")]
        public string ScreenName { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("indices")]
        public List<int> Indices { get; set; }

    }

}
