import React, { useState, useRef, useEffect } from 'react';

import {
	View,
	Text,
	StyleSheet,
	Button,
	Alert,
	ScrollView,
	FlatList,
	Dimensions,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNum = Math.floor(Math.random() * (max - min)) + min;
	if (randomNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNum;
	}
};

// to render our scrollview
const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
		<Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
	</View>
);

const GameScreen = (props) => {
	const inititalGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(inititalGuess);
	const [pastGuesses, setPastGuesses] = useState([inititalGuess.toString()]);
	const [detectedWidth, setDetectedWidth] = useState(Dimensions.get('window').width);
	const [detectedHeight, setDetectedHeight] = useState(Dimensions.get('window').height);
	// Logic here to create value that will survive component re-render
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	//  destructuring here to pass into dependency array
	const { userChoice, onGameOver } = props;
	// Detect height and width on render to pass to layout conditional
	useEffect(() => {
		const updateLayout = () => {
			setDetectedWidth(Dimensions.get('window').width);
			setDetectedHeight(Dimensions.get('window').height);
		};

		Dimensions.addEventListener('change', updateLayout);

		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'greater' && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", 'Computer will be sad.', [
				{ text: 'sorry!', style: 'cancel' },
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		// setRounds((curRounds) => curRounds + 1);
		setPastGuesses((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses]);
	};

	// let listContainerStyle = styles.listContainer;

	// if (Dimensions.get('window').width < 350) {
	// 	listContainerStyle = styles.listContainerBig;
	// }

	// Setting conditional for landscape screen
	if (detectedHeight < 500) {
		return (
			<View style={styles.screen}>
				<Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
				<View style={styles.controls}>
					<MainButton
						style={styles.lowerButton}
						onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name='md-remove' size={24} color='white' />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton
						style={styles.greaterButton}
						onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name='md-add' size={24} color='white' />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
					<FlatList
						keyExtractor={(item) => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(this, pastGuesses.length)}
						contentContainerStyle={styles.list}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			{/* remember that current guess is the first number we initialize when component mounts */}
			<Card style={styles.buttonContainer}>
				{/* here we bind some default arguments to these buttons using .bind */}
				<MainButton
					style={styles.lowerButton}
					onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name='md-remove' size={24} color='white' />
				</MainButton>
				<MainButton
					style={styles.greaterButton}
					onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		width: 400,
		maxWidth: '90%',
	},
	lowerButton: {
		backgroundColor: '#ef476f',
	},
	greaterButton: {
		backgroundColor: '#06d6a0',
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
		alignItems: 'center',
	},

	listContainer: {
		// on android, parent of scrollview MUST use flex 1
		flex: 1,
		width: '60%',
	},
	listContainerBig: {
		flex: 1,
		width: '80%',
	},
	list: {
		flexGrow: 1,
		// alignItems: 'center',
		justifyContent: 'flex-end',
		// backgroundColor: '#a8dadc',
	},
	listItem: {
		borderColor: 'black',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
});

export default GameScreen;
