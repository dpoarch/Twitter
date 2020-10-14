using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models.Json
{

    public class TimeLine
    {

        [JsonPropertyName("created_at")]
        public string CreatedAt { get; set; }

		[JsonPropertyName("id")]
		public string Id { get; set; }

		[JsonPropertyName("id_str")]
		public string IdStr { get; set; }

		[JsonPropertyName("text")]
		public string Text { get; set; }

		[JsonPropertyName("source")]
		public string Source { get; set; }

		[JsonPropertyName("truncated")]
		public bool Truncated { get; set; }

		[JsonPropertyName("in_reply_to_status_id")]
		public string InReplyToStatusId { get; set; }

		[JsonPropertyName("in_reply_to_status_id_str")]
		public string InReplyToStatusIdStr { get; set; }

		[JsonPropertyName("in_reply_to_user_id")]
		public string InReplyToUserId { get; set; }

		[JsonPropertyName("in_reply_to_user_id_str")]
		public string InReplyToUserIdStr { get; set; }

		[JsonPropertyName("in_reply_to_screen_name")]
		public string InReplyToScreenName { get; set; }

		[JsonPropertyName("user")]
		public User User { get; set; }

		[JsonPropertyName("geo")]
		public string Geo { get; set; }

		[JsonPropertyName("coordinates")]
		public string Coordinates { get; set; }

		[JsonPropertyName("place")]
		public string Place { get; set; }

		[JsonPropertyName("contributors")]
		public string Contributors { get; set; }

		[JsonPropertyName("retweet_count")]
		public int RetweetCount { get; set; }

		[JsonPropertyName("favorite_count")]
		public int FavoriteCount { get; set; }

		[JsonPropertyName("entities")]
		public Entities Entities { get; set; }

		[JsonPropertyName("favorited")]
		public bool Favorited { get; set; }

		[JsonPropertyName("retweeted")]
		public bool Retweeted { get; set; }

		[JsonPropertyName("lang")]
		public string Lang { get; set; }
    }

}
