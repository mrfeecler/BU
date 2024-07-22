using HtmlAgilityPack; 

namespace Crawl.Crawler
{
    internal class Gainers
    {
        public static async void Execute()
        {
            string baseUrl = "https://cryptorank.io/gainers";
            int page = 0;
            while (true)
            {
                page++;
                string url = $"{baseUrl}?page={page}";
                var httpClient = new HttpClient();
                var html = await httpClient.GetStringAsync(url);
                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(html);

                var trElements = htmlDocument.DocumentNode.SelectNodes("//div[@class='coins-table']//tbody//tr");

                if (trElements != null)
                {
                    foreach (var tr in trElements)
                    {
                        var tdElements = tr.SelectNodes(".//td");
                        if (tdElements != null)
                        {
                            string rank = tdElements[1].InnerText.Trim();
                            string name = tdElements[2].SelectSingleNode(".//p")?.InnerText.Trim();
                            string price = tdElements[3].SelectSingleNode(".//p")?.InnerText.Trim();
                            string percentChange = tdElements[4].SelectSingleNode(".//span")?.InnerText.Trim();
                            string marketCap = tdElements[5].SelectSingleNode(".//p")?.InnerText.Trim();
                            string volume = tdElements[6].SelectSingleNode(".//p")?.InnerText.Trim();
                            string circulatingSupply = tdElements[7].SelectSingleNode(".//p")?.InnerText.Trim();


                            Console.WriteLine();
                        }
                    }
                }
                else
                {
                    break;
                }
            }
        }
    }
}
