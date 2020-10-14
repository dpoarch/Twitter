using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace TwitterTools.Web.Models.Json
{

    public class Description
    {		
        [JsonPropertyName("urls")]
		public List<Url> Urls { get; set; }
    }

}
