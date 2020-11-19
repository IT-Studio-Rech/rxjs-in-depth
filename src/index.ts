import demos from "./demos";

async function demo() {
  await demos.operatorsDemo(); // 01

  // await demos.hotColdDemo(); // 02

  // await demos.mc1multiObserversDemo(); // 03
  // await demos.mc2subjectMulticastingDemo(); // 04
  // await demos.mc4multicastOperatorDemo(); // 05
  // await demos.mc3simplifiedBogusMulticastDemo(); // bonus 01
  // await demos.mc5multicastRefCountDemo(); // 06

  // await demos.mc6publishDemo(); // bonus 02
  // await demos.mc7publishRefCountDemo(); // bonus 03
  // await demos.mc8publishBehaviorDemo(); // bonus 04
  // await demos.mc9publishReplayDemo(); // bonus 05

  // await demos.mc10shareDemo(); // 07
  // await demos.mc11shareReplayDemo(); // 08

  // await demos.mc12shareReplayLatestWhileConnectedDemo(); // bonus 06

  // await demos.errorHandlingDemo(); // 09
}

demo();
