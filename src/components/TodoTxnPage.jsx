import React, { useState, useEffect } from "react";
import { constants_abi } from "../../constants";
import { encodeFunctionData } from "viem";
import { useOkto } from "okto-sdk-react";

const TodoListTransaction = ({
	authToken,
	contractAddress,
	moduleName = "todolist",
}) => {
	const {
		getUserDetails,
		executeRawTransaction,
		createWallet,
		getWallets,
		getRawTransactionStatus,
		orderHistory,
	} = useOkto();

	const [todoData, setTodoData] = useState({
		action: "",
		content: "",
		task_id: "",
	});
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [wallets, setWallets] = useState(null);
	const [account, setAccount] = useState(
		"0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090"
	);

  useEffect(() => {
    console.log(constants_abi)
		fetchUserWallets();
	}, []);

	const convertWalletData = (walletsData) => {
		if (!walletsData || !Array.isArray(walletsData)) {
			return null;
		}

		return walletsData.reduce((acc, wallet) => {
			if (wallet && wallet.network && wallet.address) {
				acc[wallet.network] = {
					address: wallet.address,
				};
			}
			return acc;
		}, {});
	};

	const fetchUserWallets = async () => {
		try {
			setError(null);

			setAccount(
				"0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090"
			);
		} catch (error) {
			console.error("Wallet fetch error:", error);
			setError(`Failed to fetch wallets: ${error.message}`);
		}
	};

	const transactionListener = async (jobId) => {
		if (!jobId) {
			throw new Error("No job ID provided for transaction monitoring");
		}

		try {
			const status = await getRawTransactionStatus(jobId);
			setResponse(status);
			return status;
		} catch (error) {
			console.error("Transaction status error:", error);
			throw error;
		}
	};

	const handleTodoAction = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		if (!authToken) {
			setError("Not authenticated. Please log in first.");
			setLoading(false);
			return;
		}

		if (!contractAddress) {
			setError("Contract address is required");
			setLoading(false);
			return;
		}

		try {
			let payload;
			switch (todoData.action) {
				case "create_list":
					payload = {
						function: `${contractAddress}::${moduleName}::create_list`,
						type_arguments: [],
						arguments: [],
					};
					break;
				case "create_task":
					if (!todoData.content?.trim()) {
						throw new Error("Task content is required");
					}
					payload = {
						function: `${contractAddress}::${moduleName}::create_task`,
						type_arguments: [],
						arguments: [todoData.content],
					};
					break;
				case "complete_task":
					if (!todoData.task_id?.trim()) {
						throw new Error("Task ID is required");
					}
					payload = {
						function: `${contractAddress}::${moduleName}::complete_task`,
						type_arguments: [],
						arguments: [todoData.task_id],
					};
					break;
				default:
					throw new Error("Please select a valid action");
			}

			if (!account) {
				throw new Error(
					"No account available. Please ensure your wallet is connected."
				);
			}

			const encodedTransferCall = {
				abi: constants_abi,
				functionName: todoData.action,
				args:
					todoData.action === "create_task"
						? [todoData.content]
						: todoData.action === "complete_task"
						? [todoData.task_id]
						: [],
			};

			const requestData = {
				network_name: "APTOS_TESTNET",
				transaction: payload,
			};

			console.log(requestData);
			console.log("raw execution starts : ");
			const txResponse = await executeRawTransaction(requestData);
			if (!txResponse?.jobId) {
				throw new Error("Failed to get transaction job ID");
			}

			await transactionListener(txResponse.jobId);
			setResponse(txResponse);
		} catch (err) {
			console.error("Transaction error:", err);
			setError(err.message || "Failed to execute transaction");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTodoData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className='p-4'>
			<h2 className='text-xl font-bold mb-4'>TodoList Actions</h2>
			{error && (
				<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
					{error}
				</div>
			)}
			<form onSubmit={handleTodoAction} className='space-y-4'>
				<div>
					<select
						name='action'
						value={todoData.action}
						onChange={handleInputChange}
						required
						className='w-full p-2 border rounded'
					>
						<option value=''>Select Action</option>
						<option value='create_list'>Create TodoList</option>
						<option value='create_task'>Create Task</option>
						<option value='complete_task'>Complete Task</option>
					</select>
				</div>

				{todoData.action === "create_task" && (
					<div>
						<input
							type='text'
							name='content'
							placeholder='Task Content'
							value={todoData.content}
							onChange={handleInputChange}
							required
							className='w-full p-2 border rounded'
						/>
					</div>
				)}

				{todoData.action === "complete_task" && (
					<div>
						<input
							type='text'
							name='task_id'
							placeholder='Task ID'
							value={todoData.task_id}
							onChange={handleInputChange}
							required
							className='w-full p-2 border rounded'
						/>
					</div>
				)}

				<button
					type='submit'
					disabled={loading}
					className={`w-full p-2 rounded ${
						loading
							? "bg-gray-400 cursor-not-allowed"
							: "bg-blue-500 hover:bg-blue-600 text-white"
					}`}
				>
					{loading ? "Processing..." : "Submit Transaction"}
				</button>
			</form>

			{response && (
				<div className='mt-4'>
					<h3 className='text-lg font-semibold'>Transaction Response:</h3>
					<pre className='bg-gray-100 p-4 rounded mt-2 overflow-auto'>
						{JSON.stringify(response, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};

export default TodoListTransaction;
