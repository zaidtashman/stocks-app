var Kafka = require('node-rdkafka');
// var producer = new Kafka.Producer({'metadata.broker.list': '35.162.228.62:9092'});
// var producer = new Kafka.Producer({
//   'client.id': 'kafka',
//   'metadata.broker.list': '35.162.228.62:9092',
//   'compression.codec': 'gzip',
//   'retry.backoff.ms': 200,
//   'message.send.max.retries': 10,
//   'socket.keepalive.enable': true,
//   'queue.buffering.max.messages': 100000,
//   'queue.buffering.max.ms': 1000,
//   'batch.num.messages': 1000000,
//   'dr_cb': true
// });    

// Our producer with its Kafka brokers
// This call returns a new writable stream to our topic 'topic-name'
var stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': '35.162.228.62:9092'
}, {}, {
  topic: 'prediction-request'
});

// Writes a message to the stream
var queuedSuccess = stream.write(new Buffer('Awesome message'));

if (queuedSuccess) {
  console.log('We queued our message!');
} else {
  // Note that this only tells us if the stream's queue is full,
  // it does NOT tell us if the message got to Kafka!  See below...
  console.log('Too many messages in our queue already');
}

stream.on('error', function (err) {
  // Here's where we'll know if something went wrong sending to Kafka
  console.error('Error in our kafka stream');
  console.error(err);
})