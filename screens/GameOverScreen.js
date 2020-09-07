import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';
const GameOverScreen = (props) => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<Text style={DefaultStyles.title}>The Game is Over!</Text>
				<View style={styles.imgContainer}>
					<Image
						source={require('../assets/success.png')}
						// alternative img
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
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imgContainer: {
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: (Dimensions.get('window').width * 0.7) / 2,
		borderWidth: 3,
		borderColor: colors.accent,
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30,
	},
	highlight: {
		color: colors.primary,
		fontFamily: 'open-sans-bold',
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').height / 60,
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
	},
});

export default GameOverScreen;
