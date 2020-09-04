import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = (props) => {
	return <Text stlye={styles.body}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	body: {
		fontFamily: 'open-sans-regular',
	},
});

export default BodyText;
