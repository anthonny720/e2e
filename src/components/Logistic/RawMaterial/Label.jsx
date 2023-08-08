import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from '../../../assets/logo.png'

const styles = StyleSheet.create({
    image: {
        width: 100, borderRadius: 10, padding: "2px",

    }, container: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },

    box: {
        border: '1px solid black', justifyContent: 'center', alignItems: 'center', width: '48%', height: '40%'
    }, text: {
        fontSize: '2rem', color: 'red',
    }
})
const LabelViewer = ({data}) => {
    return (<PDFViewer style={{width: "100%", height: "100%"}}>
        <Document>
            <Page orientation={"landscape"} size="A4" style={styles.container}>
                <View style={styles.box}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <Image style={styles.image} src={Logo}/>
                        <Text style={{
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            backgroundColor: "#fbbf24",
                            color: "white",
                            padding: "6px",
                            borderWidth: "2px",
                            borderColor: "black",
                            borderStyle: "solid"
                        }}>ROTULO DE MATERIA PRIMA</Text>

                    </View>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "2px",
                            width: "30%",
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Lote</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "4px"
                            }}>{data?.lot}
                                </Text>

                            <Image style={styles.image}
                                   src={`http://api.qrserver.com/v1/create-qr-code/?data=${process.env.REACT_APP_API_URL}/logistic/${data?.lot}&size=100x100`}/>
                        </View>


                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Número</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                inicial</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Parcela</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                fontSize: "8px",
                                textAlign: "center",
                                justifyContent: "center",
                                whiteSpace: "wrap",
                                width: "100%",

                            }}>{data?.parcels_name}</Text>
                        </View>
                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Producto</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                                padding: "4px",
                                textAlign: "center"
                            }}>{data?.category_name}</Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                final</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Información</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>

                        </View>

                    </View>

                </View>
                <View style={styles.box}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <Image style={styles.image} src={Logo}/>
                        <Text style={{
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            backgroundColor: "#fbbf24",
                            color: "white",
                            padding: "6px",
                            borderWidth: "2px",
                            borderColor: "black",
                            borderStyle: "solid"
                        }}>ROTULO DE MATERIA PRIMA</Text>

                    </View>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "2px",
                            width: "30%",
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Lote</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "4px"
                            }}>{data?.lot}
                                </Text>

                            <Image style={styles.image}
                                   src={`http://api.qrserver.com/v1/create-qr-code/?data=${process.env.REACT_APP_API_URL}/logistic/${data?.lot}&size=100x100`}/>
                        </View>


                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Número</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                inicial</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Parcela</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                fontSize: "8px",
                                textAlign: "center",
                                justifyContent: "center",
                                whiteSpace: "wrap",
                                width: "100%",

                            }}>{data?.parcels_name}</Text>
                        </View>
                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Producto</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                                padding: "4px",
                                textAlign: "center"
                            }}>{data?.category_name}</Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                final</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Información</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>

                        </View>

                    </View>

                </View>
                <View style={styles.box}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <Image style={styles.image} src={Logo}/>
                        <Text style={{
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            backgroundColor: "#fbbf24",
                            color: "white",
                            padding: "6px",
                            borderWidth: "2px",
                            borderColor: "black",
                            borderStyle: "solid"
                        }}>ROTULO DE MATERIA PRIMA</Text>

                    </View>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "2px",
                            width: "30%",
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Lote</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "4px"
                            }}>{data?.lot}
                                </Text>

                            <Image style={styles.image}
                                   src={`http://api.qrserver.com/v1/create-qr-code/?data=${process.env.REACT_APP_API_URL}/logistic/${data?.lot}&size=100x100`}/>
                        </View>


                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Número</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                inicial</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Parcela</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                fontSize: "8px",
                                textAlign: "center",
                                justifyContent: "center",
                                whiteSpace: "wrap",
                                width: "100%",

                            }}>{data?.parcels_name}</Text>
                        </View>
                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Producto</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                                padding: "4px",
                                textAlign: "center"
                            }}>{data?.category_name}</Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                final</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Información</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>

                        </View>

                    </View>

                </View>
                <View style={styles.box}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <Image style={styles.image} src={Logo}/>
                        <Text style={{
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            backgroundColor: "#fbbf24",
                            color: "white",
                            padding: "6px",
                            borderWidth: "2px",
                            borderColor: "black",
                            borderStyle: "solid"
                        }}>ROTULO DE MATERIA PRIMA</Text>

                    </View>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "2px"}}>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "2px",
                            width: "30%",
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Lote</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "4px"
                            }}>{data?.lot}
                                </Text>

                            <Image style={styles.image}
                                   src={`http://api.qrserver.com/v1/create-qr-code/?data=${process.env.REACT_APP_API_URL}/logistic/${data?.lot}&size=100x100`}/>
                        </View>


                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Número</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                inicial</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Parcela</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                fontSize: "8px",
                                textAlign: "center",
                                justifyContent: "center",
                                whiteSpace: "wrap",
                                width: "100%",

                            }}>{data?.parcels_name}</Text>
                        </View>
                        <View style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", width: "30%"
                        }}>
                            <Text style={{
                                fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"
                            }}>Producto</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                                padding: "4px",
                                textAlign: "center"
                            }}>{data?.category_name}</Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Peso
                                final</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>
                            <Text style={{fontWeight: "extrabold", fontFamily: "Times-Roman", fontSize: "12px"}}>Información</Text>
                            <Text style={{
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                borderWidth: "2px",
                                width: "100%",
                                height: "30px",
                            }}></Text>

                        </View>

                    </View>

                </View>
            </Page>
        </Document>
    </PDFViewer>);
};

export default LabelViewer;
