using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models.Json
{

    public class Entities
    {

        [JsonPropertyName("hashtags")]
		public List<Hashtag> Hashtags { get; set; }

        [JsonPropertyName("symbols")]
		public List<string> Symbols { get; set; }

        [JsonPropertyName("urls")]
		public List<Url> Urls { get; set; }

        [JsonPropertyName("user_mentions")]
        public List<UserMention> UserMentions { get; set; }

        [JsonPropertyName("media")]
        public List<Media> Media { get; set; }
    }

}
