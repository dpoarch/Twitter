using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models
{

    public class HashTag
    {
        [JsonPropertyName("top")]
        public int Top { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

    }

}
