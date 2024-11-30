import {
	Account,
	Aptos,
	AptosConfig,
	Ed25519PrivateKey,
	Network,
} from "@aptos-labs/ts-sdk";

async function mintToken(aptos: Aptos, to: string) {
	const pk =
		"0xd0f09af40a07b2e443db690f435ce0071c13551762f49b13f078900c7f3e6dcc";

	const privateKey = new Ed25519PrivateKey(pk);
	const wallet = Account.fromPrivateKey({ privateKey });
    
	const txn = await aptos.transaction.build.simple({
		sender: wallet.accountAddress,
		data: {
			function:
				"0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090::todolist::create_task",
		 	functionArguments: ["edrfgh"],
		},
	});

	const committedTxn = await aptos.signAndSubmitTransaction({
		signer: wallet,
		transaction: txn,
	});

	const res = await aptos.waitForTransaction({
		transactionHash: committedTxn.hash,
	});
	console.log(res);
	return res.success;
}

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

mintToken(
	aptos,
	""
);
