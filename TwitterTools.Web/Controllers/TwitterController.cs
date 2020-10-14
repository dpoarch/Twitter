using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;
using TwitterTools.Web.Util;
using TwitterTools.Web.Interface;
using TwitterTools.Web.Models;
using TwitterTools.Web.Models.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TwitterTools.Web.Controllers
{
    [Route("[controller]")]
    public class TwitterController : Controller
    {
        private readonly IConfiguration Configuration;
        
        public TwitterController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        [Route("get-top-hashtags")]
        //public List<Place> GetTopHashTags()
        public string GetTopHashTags()
        {         
            IAuthenticateSettings authenticateSettings = new AuthenticateSettings
            {
                OAuthConsumerKey = Configuration.GetValue<string>("Twitter:oAuthConsumerKey"),
                OAuthConsumerSecret = Configuration.GetValue<string>("Twitter:oAuthConsumerSecret"),
                OAuthUrl = Configuration.GetValue<string>("Twitter:oAuthUrl")
            };

            var twitAuthResponse = HttpRequestHelper.AuthenticateMe(authenticateSettings);

            string fullUrl = "https://api.twitter.com/1.1/trends/place.json?id=1";
            //https://api.twitter.com/1.1/trends/place.json?id=1
            //var data = HttpRequestHelper.RequestJson<List<Place>>(fullUrl, twitAuthResponse.TokenType, twitAuthResponse.AccessToken);
            var data = HttpRequestHelper.RequestJson(fullUrl, twitAuthResponse.TokenType, twitAuthResponse.AccessToken);

            return data;
        }

        [HttpGet]
        [Route("search")]
        public async Task<Search> Search(string query)
        {
            try
            {

                IAuthenticateSettings authenticateSettings = new AuthenticateSettings
                {
                    OAuthConsumerKey = Configuration.GetValue<string>("Twitter:oAuthConsumerKey"),
                    OAuthConsumerSecret = Configuration.GetValue<string>("Twitter:oAuthConsumerSecret"),
                    OAuthUrl = Configuration.GetValue<string>("Twitter:oAuthUrl")
                };
                
                var twitAuthResponse = HttpRequestHelper.AuthenticateMe(authenticateSettings);
                
                return HttpRequestHelper.RequestJson<Search>($"{Configuration.GetValue<string>("Twitter:searchBaseUrl")}{query}", twitAuthResponse.TokenType, twitAuthResponse.AccessToken);
            }
            catch (Exception ex)
            {

                throw;
            }

        }


        //[HttpGet]
        //[Route("stream")]
        //public async Task<string> Stream(string query)
        //{
        //    try
        //    {

        //        IAuthenticateSettings authenticateSettings = new AuthenticateSettings
        //        {
        //            OAuthConsumerKey = Configuration.GetValue<string>("Twitter:oAuthConsumerKey"),
        //            OAuthConsumerSecret = Configuration.GetValue<string>("Twitter:oAuthConsumerSecret"),
        //            OAuthUrl = Configuration.GetValue<string>("Twitter:oAuthUrl")
        //        };

        //        var twitAuthResponse = HttpRequestHelper.AuthenticateMe(authenticateSettings);
        //        //var result = HttpRequestHelper.RequestJson("https://api.twitter.com/2/tweets/sample?tweet.fields=created_at&expansions=author_id&user.fields=created_a", twitAuthResponse.TokenType, twitAuthResponse.AccessToken);
        //        //var result = HttpRequestHelper.RequestJson<Search>("https://api.twitter.com/1.1/search/tweets.json?q=%23test", twitAuthResponse.TokenType, twitAuthResponse.AccessToken);
        //        //return result;

        //        //curl --location --request GET 'https://api.twitter.com/2/tweets/search/recent?query=nyc&tweet.fields=author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source'

        //        return HttpRequestHelper.RequestJson(Configuration.GetValue<string>("Twitter:streamBaseUrl"), twitAuthResponse.TokenType, twitAuthResponse.AccessToken);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }

        //}

        [HttpGet]
        [Route("call")]
        public async Task<string> CallUrl(string url)
        {
            try
            {

                IAuthenticateSettings authenticateSettings = new AuthenticateSettings
                {
                    OAuthConsumerKey = Configuration.GetValue<string>("Twitter:oAuthConsumerKey"),
                    OAuthConsumerSecret = Configuration.GetValue<string>("Twitter:oAuthConsumerSecret"),
                    OAuthUrl = Configuration.GetValue<string>("Twitter:oAuthUrl")
                };

                var twitAuthResponse = HttpRequestHelper.AuthenticateMe(authenticateSettings);

                string fullUrl = url.StartsWith("http", StringComparison.InvariantCultureIgnoreCase) ? url:  $"{Configuration.GetValue<string>("Twitter:baseUrl")}{url}";

                return HttpRequestHelper.RequestJson(fullUrl, twitAuthResponse.TokenType, twitAuthResponse.AccessToken);
            }
            catch (Exception ex)
            {
                return ex.ToString();
                //throw;
            }

        }

    }
}
