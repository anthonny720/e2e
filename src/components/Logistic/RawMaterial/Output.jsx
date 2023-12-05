import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from '../../../assets/logo.png'
import {filter, map, sumBy} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";

const styles = StyleSheet.create({
    image: {
        width: 70, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex", justifyContent: "space-around", width: "100%",

        flexDirection: "row",

        borderBottom: "1px"
    }
});
const Output = ({info, date}) => {
    const responde = useSelector(state => state.Logistic.output_items)
    const data = filter(responde, (item) => item.date === date)
    const total = sumBy(data, (item) => item.net_weight)
    return (<PDFViewer style={{width: "100%", height: "100%"}}>
        <Document>
            <Page size="A4" style={{padding: "20px", width: "100%"}}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    gap: "24px",
                }}>
                    <Image style={styles.image} src={Logo}/>
                    <Text style={{
                        fontSize: "12px", fontWeight: "extrabold", textAlign: "center", textTransform: "uppercase"
                    }}>SALIDA DE MATERIA PRIMA - {new Date(date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'
                    })}</Text>
                </View>
                <View style={{
                    display: "flex",
                    gridTemplateColumns: "1fr 1fr",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px",
                    gap: "16px",

                }}>
                    <View style={{display: "flex", flexDirection: "column", gap: "1px"}}>
                        <Text style={{
                            fontSize: "8px", color: "gray", fontWeight: "light"
                        }}>Proveedor: {info?.provider_name}</Text>
                        <Text style={{fontSize: "8px", color: "gray", fontWeight: "light"}}>Guía de
                            transportista: {info?.carrier_guide}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "column", gap: "1px"}}>
                        <Text style={{fontSize: "8px", color: "gray", fontWeight: "light"}}>Fecha de
                            ingreso: {new Date(info?.entry_date).toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                            })}</Text>
                        <Text style={{fontSize: "8px", color: "gray", fontWeight: "light"}}>Guía de
                            proveedor: {info?.provider_guide}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "column", gap: "1px"}}>
                        <Text style={{fontSize: "8px", color: "gray", fontWeight: "light"}}>Fecha de
                            descarga:{new Date(info?.download_date).toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                            })}</Text>
                        <Text style={{fontSize: "8px", color: "gray", fontWeight: "light"}}>Lote: {info?.lot}</Text>
                    </View>

                </View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                    alignItems: "center",
                    padding: "4px",
                }}>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                    }}>N°</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                    }}>Peso inicial(bruto) </Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                    }}>Peso salida (bruto)</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                    }}>Peso neto final</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                    }}>Tara</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                    }}>Jabas</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                    }}>Pallet</Text>

                </View>

                {data && map(data, (item, index) => {
                    return (<View key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                        alignItems: "center",
                        padding: "4px",

                    }}>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.item?.number}</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.item?.weight, 2)}</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.kg, 2)}</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.net_weight, 2)}</Text>
                        {info?.category_name === "Piña" && <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.item?.tare, 2)}</Text>}
                        {info?.category_name === "Piña" && <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.item?.boxes, 2)}</Text>}
                        {info?.category_name === "Piña" && <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.item?.pallet_name}</Text>}


                    </View>)
                })}
                <View style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    gap: "12px",
                    marginTop: "12px",
                    justifyContent: "center"
                }}>

                    <Text style={{
                        fontSize: "8px",
                        color: "black",
                        fontWeight: "light",
                        padding: "4px",
                        backgroundColor: "#eaeaea",
                        borderRadius: "4px"
                    }}>Peso bruto: {Humanize.formatNumber(info?.brute_weight, 2)}</Text>
                    <Text style={{
                        fontSize: "8px",
                        color: "black",
                        fontWeight: "light",
                        padding: "4px",
                        backgroundColor: "#eaeaea",
                        borderRadius: "4px"
                    }}>Peso neto: {Humanize.formatNumber(info?.net_weight, 2)}</Text>
                    <Text style={{
                        fontSize: "8px",
                        color: "black",
                        fontWeight: "light",
                        padding: "4px",
                        backgroundColor: "#eaeaea",
                        borderRadius: "4px"
                    }}>Peso neto sin muestra: {Humanize.formatNumber(info?.net_weight - info?.quality, 2)}</Text>

                    <Text style={{
                        fontSize: "8px",
                        color: "black",
                        fontWeight: "light",
                        padding: "4px",
                        backgroundColor: "#eaeaea",
                        borderRadius: "4px"
                    }}>Muestra de calidad: {Humanize.formatNumber(info?.quality, 2)}</Text>
                    <Text style={{
                        fontSize: "8px",
                        color: "black",
                        fontWeight: "light",
                        padding: "4px",
                        backgroundColor: "#eaeaea",
                        borderRadius: "4px"
                    }}>Entregado: {Humanize.formatNumber(total, 2)}</Text>
                </View>


            </Page>


        </Document>
    </PDFViewer>);
};

export default Output;
