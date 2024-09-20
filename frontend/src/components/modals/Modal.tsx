import { Children } from "react";
import { Image, Modal as NativeModal, Text, Touchable, TouchableOpacity, View } from "react-native";
import { theme, icons } from "../../contants";


declare interface ModalProps extends React.PropsWithChildren {
    title: string
    description: string
    showModal: boolean
    setShowModal: (value: boolean) => void
}



const Modal = ({ children, title, description, showModal, setShowModal }: ModalProps) => {

    return (
        <NativeModal
            animationType="slide"
            visible={showModal}
            style={{

            }}
        >
            <View
                style={{
                    backgroundColor: theme.white,
                    alignItems: "flex-start",
                    flex: 1,
                    padding: 20,
                    gap: 10,
                    margin: 10,
                }}>
                <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => setShowModal(false)}>
                    <Image
                        source={icons.left}
                        style={{ width: 20, height: 20, }}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontWeight: "bold",
                    color: theme.primaryText,
                    fontSize: 20
                }}
                >
                    {title}
                </Text>
                <Text style={{
                    color: theme.secondaryText,
                    fontWeight: "300",
                    fontSize: 14,
                    marginTop: -5
                }}
                >
                    {description}
                </Text>
                <View style={{ flex: 1, gap: 10, width: "100%" }}>
                    {children}
                </View>
            </View>
        </NativeModal >
    )
}


export default Modal