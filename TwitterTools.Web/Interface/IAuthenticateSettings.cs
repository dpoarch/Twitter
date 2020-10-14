using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterTools.Web.Interface
{
    public interface IAuthenticateSettings
    {
        string OAuthConsumerKey { get; set; }
        string OAuthConsumerSecret { get; set; }
        string OAuthUrl { get; set; }
    }
}
