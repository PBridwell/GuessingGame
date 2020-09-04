import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';
const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>The Game is Over!</Text>
			<View style={styles.imgContainer}>
				<Image
					source={require('../assets/success.png')}
					// source={{
					// 	uri: 'https://blog.strava.com/wp-content/uploads/2018/06/DSC02332-1.jpg',
					// }}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<View style={styles.resultContainer}>
				<Text style={DefaultStyles.bodyText}>
					Your phone needed <Text style={styles.highlight}> {props.roundsNumber} </Text>
					rounds to guess the number:
					<Text style={styles.highlight}> {props.userNumber}</Text>
				</Text>
			</View>

			<MainButton onPress={props.onRestart}> Start a New Game</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imgContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: colors.accent,
		overflow: 'hidden',
		marginVertical: 30,
	},
	highlight: {
		color: colors.primary,
		fontFamily: 'open-sans-bold',
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: 15,
		fontSize: 18,
	},
});

export default GameOverScreen;
