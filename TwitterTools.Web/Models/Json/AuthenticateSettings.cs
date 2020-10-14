using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterTools.Web.Interface;

namespace TwitterTools.Web.Models.Json
{
	public class AuthenticateSettings : IAuthenticateSettings
	{
		public string OAuthConsumerKey { get; set; }
		public string OAuthConsumerSecret { get; set; }
		public string OAuthUrl { get; set; }
	}
}
