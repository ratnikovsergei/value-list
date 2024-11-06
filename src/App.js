import { useState } from 'react'
import styles from './app.module.css'

export function App() {
	const [value, setValue] = useState('')
	const [list, setList] = useState([])
	const [error, setError] = useState('')

	function onInputButtonClick() {
		let promptValue = prompt()

		if (promptValue.length < 3) {
			setError('Вводимое значение должно быть не менее 3 символов')
		} else {
			setValue(promptValue)
		}
	}

	let isValueValid = value.length < 3 ? false : true

	function onAddButtonClick() {
		if (isValueValid) {
			list.push({
				id: new Date(),
				value: value,
			})
		}
		let updatedList = [...list]
		setList(updatedList)
		setError('')
		setValue('')
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : null}
				<ul className={styles.list}>
					{list.map(({ value, id }) => (
						<li className={styles['list-item']} key={id}>
							{value}{' '}
							<strong>
								{new Date().toLocaleString('ru-RU').replace(',', ' ')}
							</strong>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
