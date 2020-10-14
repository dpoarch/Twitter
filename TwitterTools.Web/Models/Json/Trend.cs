using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TwitterTools.Web.Models.Json
{
    public class Place
    {
        [JsonPropertyName("trends")]
        List<Trend> Trends { get; set; }
    }
    public class Trend
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("promoted_content")]
        public string PromotedContent { get; set; }

        [JsonPropertyName("query")]
        public string Query { get; set; }

        [JsonPropertyName("tweet_volume")]
        public int TweetVolume { get; set; }
    }
}
