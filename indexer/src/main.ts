import { config } from "dotenv";
config(); // Load environment variables from .env

import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { BridgeERC20Transfer } from "./model";
import { trace } from "console";

const bridgeAddresses = new Set([
  "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1", // Optimism L1 Standard Bridge
  "0x57891966931eb4bb6fb81430e6ce0a03aabde063", // zkSync L1 Bridge (example)
]);
const proxyAddress = new Set(["0x25ace71c97b33cc4729cf772ae268934f7ab5fa1"]);

const fromBlock = Number(process.env.FROM_BLOCK);
const toBlock = Number(process.env.TO_BLOCK);

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/ethereum-mainnet")
  .setRpcEndpoint({
    url: process.env.RPC_ETH_HTTP || "",
    rateLimit: 10,
  })
  .setFinalityConfirmation(75)
  .setBlockRange({ from: fromBlock, to: toBlock })
  .setFields({
    transaction: {
      input: true,
      value: true,
      hash: true,
      from: true,
      to: true,
      block: {
        height: true,
        timestamp: true,
      },
    },
    trace: {
      transaction: true,
      callFrom: true,
      callTo: true,
      callValue: true,
      type: true,
    },
  })

  .addTransaction({})
  .addTrace({});

const db = new TypeormDatabase();

processor.run(db, async (ctx) => {
  const transfers: BridgeERC20Transfer[] = [];

  for (const block of ctx.blocks) {
    // Process traces (internal calls)
    for (const trace of block.traces) {
      if (trace.type !== "call") continue;

      const actionKeys = Object.keys(trace || {});
      const fourthKey = actionKeys[4]; // zero-based index 3 = 4th key
      const actionValueRaw = trace[fourthKey];
      if (!actionValueRaw.value) {
        continue;
      }
      if (
        actionValueRaw.from === "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1" &&
        trace.transaction.to !== "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1"
      ) {
      
  
        const amount = BigInt(actionValueRaw.value);
        const to = actionValueRaw.to || "";
        const from = actionValueRaw.from;
        console.log(trace)
        transfers.push(
          new BridgeERC20Transfer({
            id: trace.transaction.hash + "-" + trace.traceAddress.join("_"),
            txHash: trace.transaction.hash,
            logIndex: 0,
            blockNumber: BigInt(block.transactions[0].block.height),
            timestamp: BigInt(block.transactions[0].block.timestamp),
            from,
            to,
            amount,
            bridgeName: bridgeAddressToName(from) || bridgeAddressToName(to),
            direction: "IN",
            destinationChain:
              inferDestinationChain(from) || inferDestinationChain(to),
          })
        );
      }
      
     
    }

    // Process transactions (external)
    for (const tx of block.transactions) {
      const txKeys = Object.keys(tx);
      const fifthKey = txKeys[4]; // zero-based index 4 = 5th key
      const fifthValueRaw = tx[fifthKey];
      if (fifthValueRaw === "0x") {
        continue;
      }
      const amount = BigInt(fifthValueRaw ?? 0);

      const txFrom = tx.from.toLowerCase();

      const txTo = (tx.to || "").toLowerCase();
      if (txTo !== "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1") {
        continue;
      }
      console.log(tx)
      transfers.push(
        new BridgeERC20Transfer({
          id: tx.hash + "-0",
          txHash: tx.hash,
          logIndex: 0,
          blockNumber: BigInt(tx.block.height),
          timestamp: BigInt(tx.block.timestamp),
          from: txFrom,
          to: txTo,
          amount,
          bridgeName: bridgeAddressToName(txFrom) || bridgeAddressToName(txTo),
          direction: "OUT",
          destinationChain:
            inferDestinationChain(txFrom) || inferDestinationChain(txTo),
        })
      );
   
    }
  }

  await ctx.store.insert(transfers);
});

function bridgeAddressToName(address: string): string | undefined {
  switch (address) {
    case "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1":
      return "Optimism";
    case "0x57891966931eb4bb6fb81430e6ce0a03aabde063":
      return "zkSync";
    default:
      return undefined;
  }
}

function inferDestinationChain(address: string): string | undefined {
  return bridgeAddressToName(address);
}
