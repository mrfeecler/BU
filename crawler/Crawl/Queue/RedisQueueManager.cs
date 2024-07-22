

using StackExchange.Redis;

namespace Crawl.Queue
{
    internal class RedisQueueManager
    {
        private readonly ConnectionMultiplexer _redisConnection;

        public RedisQueueManager(string redisConnectionString)
        {
            _redisConnection = ConnectionMultiplexer.Connect(redisConnectionString);
        }

        public void EnqueueJob(string queueName, string jobData)
        {
            try
            {
                var db = _redisConnection.GetDatabase();
                db.ListRightPush(queueName, jobData);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error enqueueing job: {ex.Message}");
            }
        }
    }
}
