import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@theme/useTheme';
import { CLOSE } from '@constants/Textkeys';

const ErrorModal = ({ visible, message, onClose }) => {
    const { theme } = useTheme();

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalView, { backgroundColor: theme.colors.white, shadowColor: theme.colors.black, }]}>
                    <Text style={[styles.messageText, { color: theme.colors.black }]}>
                        {message}
                    </Text>
                    <TouchableOpacity
                        onPress={onClose}
                        style={[styles.button, { backgroundColor: theme.colors.buttonBGColor }]}
                    >
                        <Text style={{ color: theme.colors.white, fontFamily: 'inter_regular', fontWeight: '600' }}>{CLOSE}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: width * 0.75, // Responsive compact modal
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    messageText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
});

export default ErrorModal;
