# {{title}}

I made a video showing how! Well, I made it {% hoverhint "several weeks ago..." "Some might even call it months..." %}

<amp-youtube width="480" height="270" layout="responsive" data-videoid="T-j1cvgNJ1I"></amp-youtube>

> The goal of the video is to convey that in many cases you can pull data from web resources *without* needing to automate a web browser control.

Watching the video you will see how to use the built-in browser developer tools, discover HTTP requests that are interesting, and recreate those HTTP requests with the [LabVIEW HTTP Client VIs][http_vi_docs_url].

## Workflow

For example, let's say you want to get the current weather and decide to parse the front page of [Weather Underground][weather_underground_homepage_url]. The first thing you might try is right clicking on the weather shown on the page, choosing Inspect, and examining the DOM in the [Elements pane][chrome_dev_tools_elements_pane_url].

::: `figure`

<amp-anim width="640" height="509" layout="responsive" src="/assets/scraping/weather_inspect_element.gif"></amp-anim>

:::

::: `figcaption`

Using Inspect and the Elements pane to find where the temperature is located in the DOM

:::

### Problems Relying on the Elements Pane

1. It is possible the structure of the page may change. Web pages change look and structure all the time, we probably don't want to fix our web scraping VI over and over again.

2. The page might not be very easy to parse. Many pages at best have lots of extraneous information and at worst have invalid / poorly structured HTML.

3. The Elements pane shows the live DOM tree _including_ manipulations by JavaScript. The data might not be in the source HTML and instead may be gathered programmatically via JavaScript and then added to the DOM.

### Use an API When Available

The best way to prevent issues with relying on DOM structure is to use an API provided by the web service. A programmatic API is usually the intended way to access data.

For example, Weather Underground has the [Weather Underground API][weather_underground_api_url] which has [online documentation][weather_underground_api_docs_url] and returns easy to parse JSON:

::: `figure`

```json
{
  "response": {
    "version": "0.1",
    "termsofService": "http:\/\/www.wunderground.com\/weather\/api\/d\/terms.html",
    "features": {
      "conditions": 1
    }
  },
  "current_observation": {
    "display_location": {
      "full": "Austin, TX"
    },
    "station_id": "KTXAUSTI47",
    "observation_time": "Last Updated on June 16, 10:59 PM CDT",
    "observation_time_rfc822": "Thu, 16 Jun 2016 22:59:14 -0500",
    "weather": "Clear",
    "temperature_string": "83.3 F (28.5 C)",
    "temp_f": 83.3,
    "temp_c": 28.5,
    "relative_humidity": "69%",
    "wind_string": "From the SSE at 2.0 MPH Gusting to 7.0 MPH",
    "wind_dir": "SSE"
  }
}
```

:::

::: `figcaption`

Example response from Weather Underground API filtered to show relevant content.

:::

After signing up for the API to get our key and using the docs to understand the URL structure, we can create a VI that uses the Weather Underground API:

::: `figure`

<amp-img width="733" height="286" layout="responsive" src="/assets/scraping/weather_underground_api.png"></amp-img>

:::

::: `figcaption`

A LabVIEW VI that calls the Weather Underground API using a zip code and an API Key provided by registration

:::

### When An API is Not Available

If the web service does not provide an API it is time to get crafty. We have to resort on relying on HTML structure or finding out where data is dynamically loaded from. This is the approach used by [the video](#topofpage) and can be summarized roughly as follows:

1. Find a web page you want to scrape in your web browser.

2. Open the developer tools in your browser, record the network requests, and inspect the network requests for useful data.

    I am partial to the [Chrome Developer Tools][chrome_dev_tools_url], but [Firefox][firefox_dev_tools_url] and [Edge][edge_dev_tools_url] all provide similar tools.

3. Look through the network requests to find one that includes the data you are trying to find.

    The best responses will be JSON or XML because LabVIEW has VIs to parse those data types.

    If you can only find the data embedded in HTML, you can use LabVIEW's string parsing VIs to search through the HTML and extract your data.

4. Use the [LabVIEW HTTP Client VIs][http_vi_docs_url] to re-create a similar network request and query the data inside of LabVIEW

In the video we were lucky to find data as [XML which LabVIEW can parse natively][labview_xml_parsing_url] although we did not go through those steps. In addition, we are lucky that we could make the request without any additional complexities like cookies or authentication.

## Complexities of Scraping Web Services

> For many LabVIEW applications the approach described in this document probably works pretty well. Local network devices frequently expose an open web interface and many public web services provide a well-documented programmatic API.

However, there are some hurdles that you may run into:

- The web service requires user login, i.e. {% hoverhint "Authentication" "Telling the service who you are or who you represent" %} and {% hoverhint "Authorization." "Figuring out what you can do or requesting something to do" %}

    This is a fairly involved topic. However some forms of login such as Client Side SSL, OAuth 1.0a, Basic Authentication, and some approaches to OAuth 2.0 are very doable in LabVIEW. In addition, using .NET Libraries for accessing web services is an approach that works well on certain platforms.

- The web service requires Cookies / Custom Headers. These are retrievable from HTTP Responses and can be passed into HTTP Requests from LabVIEW.

- The web service requires reasonably accurate clock times from LabVIEW. While not generally a problem on desktops, some devices running LabVIEW may not have built-in persistent clock components and require time configuration to communicate effectively with some web services.

Have any use cases you ran into, questions, or comments? Ask on the [LabVIEW Web Development Community][community_page_url].

[http_vi_docs_url]: https://zone.ni.com/reference/en-XX/help/371361M-01/lvcomm/http_client/
[community_page_url]: https://decibel.ni.com/content/docs/DOC-47455
[chrome_dev_tools_url]: https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/resource-loading?hl=en#network-panel-overview
[firefox_dev_tools_url]: https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor
[edge_dev_tools_url]: https://developer.microsoft.com/en-us/microsoft-edge/platform/documentation/f12-devtools-guide/network/ "We don't talk about Internet Explorer here, unless we do"
[weather_underground_homepage_url]: https://www.wunderground.com/ "Take a look at the source with developer tools, there is a lot going on"
[weather_underground_api_url]: https://www.wunderground.com/weather/api
[weather_underground_api_docs_url]: https://www.wunderground.com/weather/api/d/docs
[chrome_dev_tools_elements_pane_url]: https://developers.google.com/web/tools/chrome-devtools/iterate/inspect-styles/
[labview_xml_parsing_url]: http://zone.ni.com/reference/en-XX/help/371361M-01/lvconcepts/parsing_xml_files_in_lv/
