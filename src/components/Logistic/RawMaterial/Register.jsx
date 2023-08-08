import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from '../../../assets/logo.png'
import {map} from "lodash";
import Humanize from "humanize-plus";

const styles = StyleSheet.create({
    image: {
        width: 70, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex", justifyContent: "space-around", width: "100%",

        flexDirection: "row",

        borderBottom: "1px"
    }
});
const RegisterViewer = ({info, data}) => {
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
                        fontSize: "12px", fontWeight: "extrabold", textAlign: "center",
                    }}>ALMACÉN DE MATERIA PRIMA</Text>
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
                    }}>Peso de ingreso</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "40%", textAlign: "center"
                    }}>Tipo de jabas</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                    }}>Parihuela</Text>
                    <Text style={{
                        fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                    }}>Tara</Text>
                    {info?.category_name === "Piña" && <>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>C6</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>C8</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>C10</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>C12</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>C14</Text>
                    </>}
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
                        }}>{item?.number}</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.weight, 2)}</Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "40%", textAlign: "center"
                        }}>
                            {item?.gb > 0 && "GB: " + item?.gb + " "}
                            {item?.pa > 0 && "PAE: " + item?.pa + " "}
                            {item?.t0 > 0 && "T: " + item?.t0 + " "}
                            {item?.t1 > 0 && "TI: " + item?.t1 + " "}
                            {item?.t2 > 0 && "TII: " + item?.t2 + " "}
                            {item?.co > 0 && "CO: " + item?.co + " "}
                            {item?.gn > 0 && "GA :" + item?.gn + " "}
                            {item?.ma > 0 && "MA :" + item?.ma + " "}
                        </Text>
                        <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{item?.pallet_name}</Text>
                        <Text style={{
                             fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "20%", textAlign: "center"
                        }}>{Humanize.formatNumber(item?.tare, 2)}</Text>
                        {info?.category_name === "Piña" &&
                            <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.c6}</Text>}
                        {info?.category_name === "Piña" &&
                            <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.c8}</Text>}
                        {info?.category_name === "Piña" &&
                            <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.c10}</Text>}
                        {info?.category_name === "Piña" &&
                            <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.c12}</Text>}
                        {info?.category_name === "Piña" &&
                            <Text style={{
                            fontSize: "8px", color: "#4c4848", fontWeight: "light", width: "10%", textAlign: "center"
                        }}>{item?.c14}</Text>}

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
                    }}>Total de jabas: {Humanize.formatNumber(info?.quantity_boxes, 0)}</Text>
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
                    }}>Tara: {Humanize.formatNumber(info?.total_tare, 2)}</Text>
                    <Text style={{
                        fontSize: "8px",
                        color: "black",
                        fontWeight: "light",
                        padding: "4px",
                        backgroundColor: "#eaeaea",
                        borderRadius: "4px"
                    }}>Muestra de calidad: {Humanize.formatNumber(info?.quality, 2)}</Text>
                </View>


            </Page>


        </Document>
    </PDFViewer>);
};

export default RegisterViewer;
