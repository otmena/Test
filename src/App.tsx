import "./App.css";

import React, { useState } from "react";

interface Param {
	id: number;
	name: string;
	type: `string`;
}

interface ParamValue {
	paramId: number;
	value: string;
}

interface Color {
	id: number;
	name: string;
}

interface Model {
	paramValues: ParamValue[];
	colors: Color[];
}

const App: React.FC = () => {
	const params: Param[] = [
		{ id: 1, name: "Назначение", type: "string" },
		{ id: 2, name: "Длина", type: "string" },
	];

	const initialModel: Model = {
		paramValues: [
			{ paramId: 1, value: "повседневное" },
			{ paramId: 2, value: "100 см" },
		],
		colors: [],
	};

	const [paramValues, setParamValues] = useState<{ [key: number]: string }>(() => {
		const initialValues: { [key: number]: string } = {};
		initialModel.paramValues.forEach((paramValue) => {
			initialValues[paramValue.paramId] = paramValue.value;
		});
		return initialValues;
	});

	const handleInputChange = (paramId: number, value: string) => {
		setParamValues((prevValues) => ({
			...prevValues,
			[paramId]: value,
		}));
	};

	const getModel = (): Model => {
		const paramValuesArray: ParamValue[] = Object.entries(paramValues).map(([paramId, value]) => ({
			paramId: Number(paramId),
			value,
		}));

		return {
			...initialModel,
			paramValues: paramValuesArray,
		};
	};

	const handleGetModel = () => {
		const updatedModel = getModel();
		console.log(updatedModel);
	};

	return (
		<div>
			<h1>Редактор параметров</h1>
			{params.map((param) => (
				<div key={param.id}>
					<label>
						{param.name}:
						<input
							type='text'
							value={paramValues[param.id] || ""}
							onChange={(e) => handleInputChange(param.id, e.target.value)}
						/>
					</label>
				</div>
			))}
			<button onClick={handleGetModel}>Получить модель</button>
		</div>
	);
};

export default App;
