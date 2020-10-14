using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using TwitterTools.Web.Models.Json;
using System.Net;
using System.IO;
using TwitterTools.Web.Interface;

namespace TwitterTools.Web.Util
{
    
    public enum HttpRequestType
    {
        GET,
        POST,
        PUT,
        DELETE,
        HEAD
    }

    public static class HttpRequestHelper
    {
        public static string RequestJson(string apiUrl, string tokenType, string accessToken)
        {
            var json = string.Empty;
            HttpWebRequest apiRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
            var timelineHeaderFormat = "{0} {1}";
            apiRequest.Headers.Add("Authorization",
                                        string.Format(timelineHeaderFormat, tokenType,
                                                      accessToken));
            apiRequest.Method = "Get";
            WebResponse timeLineResponse = apiRequest.GetResponse();

            using (timeLineResponse)
            {
                using (var reader = new StreamReader(timeLineResponse.GetResponseStream()))
                {
                    json = reader.ReadToEnd();
                    // The below can be used to deserialize into a c# object
                    //var result = JsonConvert.DeserializeObject<List<TimeLine>>(json);
                }
            }
            return json;
        }

        public static T RequestJson<T>(string apiUrl, string tokenType, string accessToken) where T: class
        {
            var json = string.Empty;
            T converted;
            HttpWebRequest apiRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
            var timelineHeaderFormat = "{0} {1}";
            apiRequest.Headers.Add("Authorization",
                                        string.Format(timelineHeaderFormat, tokenType,
                                                      accessToken));
            apiRequest.Method = "Get";
            WebResponse timeLineResponse = apiRequest.GetResponse();

            using (timeLineResponse)
            {
                using (var reader = new StreamReader(timeLineResponse.GetResponseStream()))
                {
                    json = reader.ReadToEnd();
                    // The below can be used to deserialize into a c# object
                    converted = JsonSerializer.Deserialize<T>(json);
                }
            }
            return converted;
        }

        public static AuthResponse AuthenticateMe(IAuthenticateSettings authenticateSettings)
        {

            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;

            AuthResponse twitAuthResponse = null;
            // Do the Authenticate
            var authHeaderFormat = "Basic {0}";

            var authHeader = string.Format(authHeaderFormat,
                                           Convert.ToBase64String(
                                               Encoding.UTF8.GetBytes(Uri.EscapeDataString(authenticateSettings.OAuthConsumerKey) + ":" +

                                                                      Uri.EscapeDataString((authenticateSettings.OAuthConsumerSecret)))

                                               ));
            var postBody = "grant_type=client_credentials";
            HttpWebRequest authRequest = (HttpWebRequest)WebRequest.Create(authenticateSettings.OAuthUrl);

            authRequest.Headers.Add("Authorization", authHeader);
            authRequest.Method = "POST";
            authRequest.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
            authRequest.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            using (Stream stream = authRequest.GetRequestStream())
            {
                byte[] content = ASCIIEncoding.ASCII.GetBytes(postBody);
                stream.Write(content, 0, content.Length);
            }
            authRequest.Headers.Add("Accept-Encoding", "gzip");
            WebResponse authResponse = authRequest.GetResponse();
            // deserialize into an object
            using (authResponse)
            {
                using (var reader = new StreamReader(authResponse.GetResponseStream()))
                {
                    var objectText = reader.ReadToEnd();                    
                    twitAuthResponse = JsonSerializer.Deserialize<AuthResponse>(objectText);
                }
            }

            return twitAuthResponse;
        }

        //public static async Task<HttpContent> Request(string token, string baseURL, string endpoint, object data, HttpRequestType type)
        //{
        //    using (var client = new HttpClient())
        //    {
        //        client.DefaultRequestHeaders.Add("Authorization", token);
        //        client.BaseAddress = new Uri(baseURL);
        //        client.DefaultRequestHeaders.Accept.Clear();
        //        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //        client.Timeout = new TimeSpan(1, 0, 0);
        //        try
        //        {
        //            HttpResponseMessage response = null;

        //            switch (type)
        //            {
        //                case HttpRequestType.GET:
        //                    {
        //                        response = await client.GetAsync(endpoint);
        //                        break;
        //                    }

        //                case HttpRequestType.POST:
        //                    {
        //                        var param = JsonSerializer.Serialize(data);
        //                        HttpContent contentPost = new StringContent(param, Encoding.UTF8, "application/json");
        //                        response = await client.PostAsync(endpoint, contentPost);
        //                        break;
        //                    }

        //                case HttpRequestType.PUT:
        //                    {
        //                        var param = JsonSerializer.Serialize(data);
        //                        HttpContent contentPost = new StringContent(param, Encoding.UTF8, "application/json");
        //                        response = await client.PutAsync(endpoint, contentPost);
        //                        break;
        //                    }

        //                case HttpRequestType.DELETE:
        //                    {
        //                        response = await client.DeleteAsync(endpoint);
        //                        break;
        //                    }
        //                default:
        //                    throw new Exception("Unsupported Request Type");
        //            }

        //            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        //            {
        //                throw new HttpRequestException("Unauthorized");
        //            }

        //            response.EnsureSuccessStatusCode();    // Throw if not a success code.
        //            return response.Content;
        //            // TODO: Perform more operations on the response to parse the HttpContent with generics
        //            // Ideally we can abstract away the 
        //            //Product product = await response.Content.ReadAsAsync>Product>();
        //        }
        //        catch (HttpRequestException ex)
        //        {
        //            // Handle exception.
        //            throw ex;
        //        }
        //    }
        //}

        //public static async Task<HttpContent> Request(IDictionary<string, string> headers, string baseURL, string endpoint, object data, HttpRequestType type)
        //{
        //    using (var client = new HttpClient())
        //    {
        //        foreach (var key in headers.Keys)
        //        {
        //            client.DefaultRequestHeaders.Add(key, headers[key]);
        //        }
        //        client.BaseAddress = new Uri(baseURL);
        //        client.DefaultRequestHeaders.Accept.Clear();
        //        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //        client.Timeout = new TimeSpan(1, 0, 0);
        //        try
        //        {
        //            HttpResponseMessage response = null;

        //            switch (type)
        //            {
        //                case HttpRequestType.GET:
        //                    {
        //                        response = await client.GetAsync(endpoint);
        //                        break;
        //                    }

        //                case HttpRequestType.POST:
        //                    {
        //                        var param = JsonSerializer.Serialize(data);
        //                        HttpContent contentPost = new StringContent(param, Encoding.UTF8, "application/json");
        //                        response = await client.PostAsync(endpoint, contentPost);
        //                        break;
        //                    }

        //                case HttpRequestType.PUT:
        //                    {
        //                        var param = JsonSerializer.Serialize(data);
        //                        HttpContent contentPost = new StringContent(param, Encoding.UTF8, "application/json");
        //                        response = await client.PutAsync(endpoint, contentPost);
        //                        break;
        //                    }

        //                case HttpRequestType.DELETE:
        //                    {
        //                        response = await client.DeleteAsync(endpoint);
        //                        break;
        //                    }
        //                default:
        //                    throw new Exception("Unsupported Request Type");
        //            }

        //            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        //            {
        //                throw new HttpRequestException("Unauthorized");
        //            }

        //            response.EnsureSuccessStatusCode();    // Throw if not a success code.
        //            return response.Content;
        //         }
        //        catch (HttpRequestException ex)
        //        {
        //            // Handle exception.
        //            throw ex;
        //        }
        //    }
        //}
    }
}
