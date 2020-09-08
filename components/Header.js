import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';
import DefaultStyles from '../constants/default-styles';

const Header = (props) => {
	return (
		<View
			style={{
				...styles.headerBase,
				...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }),
			}}>
			<Text style={DefaultStyles.title}>{props.title}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	headerBase: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerIOS: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		backgroundColor: 'white',
	},
	headerAndroid: {
		backgroundColor: Colors.primary,
	},
	headerTitle: {
		color: 'black',
		fontSize: 18,
		fontFamily: 'open-sans-bold',
	},
	title: {
		color: Platform.OS === 'ios' ? Colors.primary : 'white',
	},
});
export default Header;
