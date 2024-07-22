using Crawl.Models;
using Newtonsoft.Json;

namespace Crawl.Queue
{
    internal class QueueService
    {
        readonly int batchSize = 1000;
        public void PushCoinsToQueue(List<Coin> datas)
        {
            try
            {
                string redisConnectionString = "127.0.0.1:6379";
                var _queueManager = new RedisQueueManager(redisConnectionString);
                for (int i = 0; i < datas.Count; i += batchSize)
                {
                    var coinsBatch = datas.Skip(i).Take(batchSize).ToList();
                    var jobData = JsonConvert.SerializeObject(new { coinsBatch });

                    _queueManager.EnqueueJob("processSeedData", jobData);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

        }
    }
}
