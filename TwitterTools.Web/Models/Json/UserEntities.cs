using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using TwitterTools.Web.Models.Json;

namespace TwitterTools.Web.Models.Json
{

    public class UserEntities
    {

        [JsonPropertyName("description")]
        public Description Description { get; set; }
    }

}
