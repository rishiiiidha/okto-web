const constants : any = [
	{
		bytecode:
			"0xa11ceb0b0700000a0c01000c020c1a032646046c0c05786907e101820208e3034006a3041e10c1046a0aab051e0cc905c8010d9107080000010101020103010401050006070000070800040a07000511040203010001021304010601000800010001000902010001000b0301000103150205000105160708020300010517090a020300010518010c020304010119020e010601051a100102030201021b1101010601040605060606070d0806090d02060c030001060c02060c0802030507080007080101050203080002060b0302090009010900010102070b030209000901090001070901010801010b030209000901010800010b04010900040308000507080103070b0302090009010900090102070b04010900090008746f646f6c697374076163636f756e74056576656e74067369676e657206737472696e67057461626c65045461736b08546f646f4c6973740d636f6d706c6574655f7461736b0b6372656174655f6c69737406537472696e670b6372656174655f7461736b077461736b5f6964076164647265737307636f6e74656e7409636f6d706c65746564057461736b73055461626c650e7365745f7461736b5f6576656e740b4576656e7448616e646c650c7461736b5f636f756e7465720a616464726573735f6f6608636f6e7461696e730a626f72726f775f6d7574036e6577106e65775f6576656e745f68616e646c65067570736572740a656d69745f6576656e745b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c0900000000000000000000000000000000000000000000000000000000000000001030802000000000000000308030000000000000003080100000000000000126170746f733a3a6d657461646174615f76315603010000000000000011455f4e4f545f494e495449414c495a454400020000000000000012455441534b5f444f45534e545f455849535400030000000000000012455441534b5f49535f434f4d504c455445440000000002040c030d050e08020f01010203100b0302030800120b0401080014030001040101042b0b0011030c020a022901040705090702270b022a010c040a0410000a013800041205160b04010700270b040f000b0138010c030a031001140921042205260b0301070127080b030f011502010104000b0a38020a00380306000000000000000012010c010b000b012d010202010401010f270b0011030c040a042901040705090702270a042a010c050a05100214060100000000000000160c020a020a040b010912000c030a050f000a020a0338040b020b050f02150b042a010f030b03380502010000030102010100",
		
	},
];

const constants_bytecode = constants.bytecode;
export const constants_abi = {
			address:
				"0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090",
			name: "todolist",
			friends: [],
			exposed_functions: [
				{
					name: "complete_task",
					visibility: "public",
					is_entry: true,
					is_view: false,
					generic_type_params: [],
					params: ["&signer", "u64"],
					return: [],
				},
				{
					name: "create_list",
					visibility: "public",
					is_entry: true,
					is_view: false,
					generic_type_params: [],
					params: ["&signer"],
					return: [],
				},
				{
					name: "create_task",
					visibility: "public",
					is_entry: true,
					is_view: false,
					generic_type_params: [],
					params: ["&signer", "0x1::string::String"],
					return: [],
				},
			],
			structs: [
				{
					name: "Task",
					is_native: false,
					is_event: false,
					abilities: ["copy", "drop", "store"],
					generic_type_params: [],
					fields: [
						{
							name: "task_id",
							type: "u64",
						},
						{
							name: "address",
							type: "address",
						},
						{
							name: "content",
							type: "0x1::string::String",
						},
						{
							name: "completed",
							type: "bool",
						},
					],
				},
				{
					name: "TodoList",
					is_native: false,
					is_event: false,
					abilities: ["key"],
					generic_type_params: [],
					fields: [
						{
							name: "tasks",
							type: "0x1::table::Table<u64, 0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090::todolist::Task>",
						},
						{
							name: "set_task_event",
							type: "0x1::event::EventHandle<0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090::todolist::Task>",
						},
						{
							name: "task_counter",
							type: "u64",
						},
					],
				},
			],
		}


