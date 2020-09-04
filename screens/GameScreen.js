import React, { useState, useRef, useEffect } from 'react';

import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

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

const GameScreen = (props) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);
	const [rounds, setRounds] = useState(0);
	// Logic here to create value that will survive component re-render
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	//  destructuring here to pass into dependency array
	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
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
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds((curRounds) => curRounds + 1);
	};
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
					LOWER
				</MainButton>
				<MainButton
					style={styles.greaterButton}
					onPress={nextGuessHandler.bind(this, 'greater')}>
					GREATER
				</MainButton>
			</Card>
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
		marginTop: 20,
		width: 400,
		maxWidth: '90%',
	},
	lowerButton: {
		backgroundColor: '#ef476f',
	},
	greaterButton: {
		backgroundColor: '#06d6a0',
	},
});

export default GameScreen;
