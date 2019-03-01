window.onload = () => {
//task1
	let tree = {
	    "id": 1,
	    "label": "a",
	    "childrenId": [2, 3, 4, 5, 6, 7, 8, 9],
	    "child": [
	        {
	            "id": 2,
	            "label": "B",
	            "childrenId": [5, 6, 7],
	            "child": [
	                {
	                    "id": 5,
	                    "label": "E",
	                    "child": []
	                },
	                {
	                    "id": 6,
	                    "label": "F",
	                    "child": []
	                },
	                {
	                    "id": 7,
	                    "label": "G",
	                    "child": []
	                }
	            ]
	        },
	        {
	            "id": 3,
	            "label": "C",
	            "child": []
	        },
	        {
	            "id": 4,
	            "label": "D",
	            "childrenId": [8, 9],
	            "child": [
	                {
	                    "id": 8,
	                    "label": "H",
	                    "child": []
	                },
	                {
	                    "id": 9,
	                    "label": "I",
	                    "child": []
	                }
	            ]
	        }
	    ]
	};
//task2
	function getData(url) {
		$.get(url, (data) => {
			console.log(data);
			console.log(find(data, 1));
		});
	};

	getData('https://api.myjson.com/bins/19knju');
//task3
	function find(obj, id) {
	    if (obj.id === id) {
	        return obj.label;
	    }

		for (let child of obj.child) {
			let result = find(child, id);

	    	if (result) {
	        	return result;
	    	}
		}
	};
//task4
	let resetButton = document.getElementById('reset-btn'),
		submitButton = document.getElementById('ok-btn'),
	 	data = {};


	function checkInput(elem, min, max, regExp, msg1, msg2, msg3) {
		let el = document.getElementById(elem),
			value = el.value;

		if (value.length < min) {
			indicate(el, msg1, 'red', '#ffd3d3');

		} else if (value.length > min && value.length > max) {
			indicate(el, msg2, 'red', '#ffd3d3');

		} else if (!value.match(regExp) && value.length >= 1) {
			indicate(el, msg3, 'red', '#ffd3d3');

		} else {
			indicate(el, 'Valid', 'green', '#d1ffd5');
			gatherData(elem, value);		
		}

		el.onfocus = function() {
			indicate(this, '', '', '#fff');
		}
	}

	function indicate(el, msg, color, background) {
		let msgField = document.getElementById(el.id + '-span');

		msgField.innerHTML = msg;
		msgField.style.color = color;
		el.style.backgroundColor = background;
	}

	function resetForm() {
		let form = document.forms[0],
			elems = form.elements,
			len = elems.length - 2,
			i;

		form.reset();

		for (i = 0; i < len; i++) {
			indicate(elems[i], '', '', '#fff');
		}
	}

	function gatherData(propName, value) {
		data[propName] = value;
	}

	function sendData() {
		console.log(JSON.stringify(data));
	}

	function indicateSuccess() {
		let msgField = document.getElementById('form'),
			msg = '<h2> Data successfully sent as: </h2>';

		for (let key in data) {
			if (key === 'address2' && data[key] === '') continue;
			msg += `<h4> <span> ${key}: </span> ${data[key]} </h4>`;
		}

		msgField.className = 'success-element';
		msgField.innerHTML = msg;
		document.body.className = 'image-on-success';
	}


	resetButton.addEventListener('click', () => {
		resetForm();
	});

	submitButton.addEventListener('click', () => {
		checkInput('name', 1, 100, /^[A-Za-z]+$/, 'This is required field', '100 symbols is max', 'Alpha only');
		checkInput('address1', 1, 100, /^[0-9a-zA-Z]+$/, 'This is required field', '100 symbols is max', 'Alphanumeric only');
		checkInput('address2', 0, 100, /^[0-9a-zA-Z]+$/, '', '100 symbols is max', 'Alphanumeric only');
		checkInput('city', 1, 50, /^[0-9a-zA-Z]+$/, 'This is required field', '50 symbols is max', 'Alphanumeric only');
		checkInput('state', 2, 2, '', 'This is required field');
		checkInput('zip', 5, 5, /^[0-9]+$/, 'This is required field of 5 symbols', 'Value must 5 symbols', 'Numeric only');

		if (Object.keys(data).length >= 6) {
			sendData();
			indicateSuccess();
		}
	});
}

