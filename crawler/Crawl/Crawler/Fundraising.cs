using HtmlAgilityPack; 

namespace Crawl.Crawler
{
    internal class Fundraising
    {
        public static async void Execute()
        {
                string baseUrl = "https://cryptorank.io/funding-rounds?rows=10000";
                var httpClient = new HttpClient();
                var html = await httpClient.GetStringAsync(baseUrl);
                List<Fundraising> fundraising = new List<Fundraising>();
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
                            string name = tdElements[1].InnerText.Trim();
                            string date = tdElements[2].SelectSingleNode(".//p")?.InnerText.Trim();
                            string price = tdElements[3].SelectSingleNode(".//p")?.InnerText.Trim();
                            string round = tdElements[4].SelectSingleNode(".//p")?.InnerText.Trim();
                            string backer = tdElements[5].InnerText.Trim();
                            string category = tdElements[6].InnerText.Trim();
                            fundraising.Add(new Fundraising() {
                                Name = name,
                                Date = date,
                                Price = price,
                                Round = round,
                                Backer = backer,
                                Category = category,
                            });

                            Console.WriteLine();
                        }
                    }
                    queue.PushCoinsToQueue(coins);
                }
                else
                {
                    break;
                }
            }
        }
    }
}
