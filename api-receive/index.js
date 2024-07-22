const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const port = 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(port, () => {
  console.log(`start with: ${port}`);
});

const { Pool } = require("pg");
const { formatDataCoinSave } = require("./helper");

app.use(function (req, res, next) {
  res.io = io;
  next();
});

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));

let oldCoins = {};

const pool = new Pool({
  user: "admin",
  host: "103.146.23.183",
  database: "db_dev",
  password: "LR8FftMlakqlZAmc",
  port: 5432,
});

const prefix = "/api";
app.post(prefix + "/coin-save", async (req, res) => {
  const data = req.body;
  const coins = formatDataCoinSave(data);
  const client = await pool.connect();
  const coinUpdate = {};
  const oldCoinUpdate = {};
  try {
    await client.query("BEGIN");
    for (const coin of coins) {
      if (!oldCoins[coin.key]) {
        coinUpdate[coin.key] = coin;
      } else {
        if (oldCoins[coin.key].price !== coin.price) {
          coinUpdate[coin.key] = coin;
        }
      }
      oldCoinUpdate[coin.key] = coin;

      const pricechangein24h = coin.quote.USD.price;
      const volumechangein24h = coin.quote.USD.volume_change_24h;
      const percent_change_24h = coin.quote.USD.percent_change_24h;
      const volume24h = coin.quote.USD.volume_24h;
      await client.query(
        `
        UPDATE coins
        SET price = $1,
            quote = $2,
            circulating_supply = $3,
            pricechangein24h = $4,
            volumechangein24h = $5,
            volume24h = $6,
            percent_change_24h = $7
            ${coin.cmc_rank !== null && coin.cmc_rank !== undefined ? ', rank = $8' : ''}
        WHERE key = $9`,
        [
          coin.price,
          coin.quote,
          coin.circulating_supply,
          pricechangein24h,
          volumechangein24h,
          volume24h,
          percent_change_24h,
          coin.cmc_rank,
          coin.key,
        ]
      );

      await client.query(
        `update ieo_ido_project
            set price=$1,quote=$2,circulating_supply=$3
            where key=$4 
          `,
        [coin.price, coin.quote, coin.circulating_supply, coin.key]
      );

      await client.query(
        ` update token_unlocks
          set price=$1,marketcap=$2,pricechangein24h=$3
          where key=$4
        `,
        [coin.price, coin.marketCap, pricechangein24h, coin.key]
      );
    }

    await client.query("COMMIT");

    res.io.emit("coinChange", coinUpdate);
    oldCoins = oldCoinUpdate;

    res.send("success");
    console.log("Coins updated | Updated time " + new Date());
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.send("Error " + err);
  } finally {
    client.release();
  }
});

app.post(prefix + "/kol-save", async (req, res) => {
  try {
    const datas = req.body;
    const client = await pool.connect();

    await client.query("BEGIN");
    for (const data of datas) {
      const result = await client.query("SELECT rank FROM kols WHERE twitter = $1", [data.twitter]);
      const kol = result.rows[0];
      data.rank_change = data.rank - kol.rank;
      if(data.rank_change != 0){
        data.rank_change_type = data.rank - kol.rank > 0 ? "up": "down";
      }
      await client.query(
        `INSERT INTO kols (rank, rank_change, rank_change_type, avatar, name, tier, followers, scores, score_change, score_change_type, blue_badge, country, twitter) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (twitter) DO UPDATE 
         SET rank = EXCLUDED.rank,
             rank_change = EXCLUDED.rank_change,
             rank_change_type = EXCLUDED.rank_change_type,
             avatar = EXCLUDED.avatar,
             name = EXCLUDED.name,
             tier = EXCLUDED.tier,
             followers = EXCLUDED.followers,
             scores = EXCLUDED.scores,
             score_change = EXCLUDED.score_change,
             score_change_type = EXCLUDED.score_change_type,
             blue_badge = EXCLUDED.blue_badge,
             country = CASE WHEN COALESCE(kols.country, '') = '' THEN EXCLUDED.country ELSE kols.country END
         RETURNING *`,
        [
          data.rank,
          data.rank_change,
          data.rank_change_type,
          data.avatar,
          data.name,
          data.tier,
          data.followers,
          data.scores,
          data.score_change,
          data.score_change_type,
          data.blue_badge,
          data.country,
          data.twitter,
        ]
      );
    }

    await client.query("COMMIT");
    res.send(datas);
    client.release();
    console.log("Kols inserted | inserted time " + new Date());
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post(prefix + "/gas-update", async (req, res) => {
  try {
    const data = req.body;
    const client = await pool.connect();
    await client.query("UPDATE marquee SET gas = $1", [data]);
    res.send("success");
    client.release();
    console.log("Gas updated | updated time " + new Date());
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post(prefix + "/btc-mvrv-ratio-update", async (req, res) => {
  try {
    const data = req.body.value;
    const client = await pool.connect();
    await client.query("UPDATE marquee SET btc_mvrv = $1", [data]);
    res.send("success");
    client.release();
    console.log("BTC MVRV updated | updated time " + new Date());
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post(prefix + "/btc-realized-price-update", async (req, res) => {
  try {
    const data = req.body.value;
    const client = await pool.connect();
    await client.query("UPDATE marquee SET btc_realized_price = $1", [data]);
    res.send("success");
    client.release();
    console.log("Btc realized price updated | updated time " + new Date());
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post(prefix + "/btc-long-update", async (req, res) => {
  try {
    const data = req.body.value;
    const client = await pool.connect();
    await client.query("UPDATE marquee SET btc_long = $1", [data]);
    res.send("success");
    client.release();
    console.log("Btc long updated | updated time " + new Date());
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
