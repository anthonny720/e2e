import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from "../../../assets/logo.jpg";
import Humanize from "humanize-plus";
import {map} from "lodash";

const styles = StyleSheet.create({
    image: {
        width: 90, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex", justifyContent: "space-around", width: "100%", flexDirection: "row",
    }, gridContainer: {
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    }, gridItem: {
        width: '50%', marginBottom: 8,
    }, gridItemFull: {
        width: '100%', marginBottom: 8,
    }, gridItemText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'extrabold',
        fontFamily: 'Times-Roman',
        marginTop: 4,
        textAlign: 'center',
    },
});
const PDFSell = ({data}) => {
    return (<PDFViewer style={{width: "100%", height: "100%"}}>
        <Document>
            <Page size="A4" style={{padding: "12px", width: "100%", height: "100%"}}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "6px",
                    gap: "24px",
                }}> <View>
                    <Text style={{
                        color: "#22c55e", fontSize: "11px", fontWeight: "extrabold", fontFamily: "Times-Roman",
                    }}>Greenbox S.A.C.</Text>
                    <Text style={{color: "#22c55e", fontSize: "8px", fontFamily: "Times-Roman",}}>Av. Manuel A.
                        Odria
                        179</Text>
                    <Text style={{color: "#22c55e", fontSize: "8px", fontFamily: "Times-Roman",}}>Tarma, Junín,
                        Perú</Text>
                    <Text style={{color: "#22c55e", fontSize: "8px", fontFamily: "Times-Roman",}}>+51 064
                        341058</Text>
                </View>
                    <Image style={styles.image} src={Logo}/>
                </View>


                <View style={[styles.section, {
                    borderBottom: "2px", borderColor: "#22c55e",
                }]}></View>


                <View style={[styles.section, {flexDirection: "column"}]}>

                    <Text style={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "center"
                    }}>ORDEN DE PRODUCCIÓN</Text>
                </View>
                <View style={[styles.gridContainer]}>
                    <Text style={[styles.gridItemFull, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>
                        Fecha estimada: {data?.date ? new Date(data?.date).toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'Sin fecha'}
                    </Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Orden de compra: {data?.po_number}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>PFI: {data?.pfi_number}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Cliente: {data?.client_name}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>FCL: {data?.fcl_name}</Text>

                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Mercado: {data?.market === 'N' ? 'Nacional' : 'Internacional'}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Materia Prima (kg): {Humanize.formatNumber(data?.mp, 2)}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Rendimiento: {Humanize.formatNumber(data?.kg / data?.mp * 100, 2)} %</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Fecha de
                        inicio: {data?.start_process ? new Date(data?.start_process + "T00:00:00").toLocaleDateString('es-PE', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        }) : 'Sin fecha'}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Fecha de
                        finalización: {data?.end_process ? new Date(data?.end_process + "T00:00:00").toLocaleDateString('es-PE', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        }) : 'Sin fecha'}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Fecha de
                        envío: {data?.load_date ? new Date(data?.load_date + "T00:00:00").toLocaleDateString('es-PE', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        }) : 'Sin fecha'}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>ETD: {data?.etd ? new Date(data?.etd + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'Sin fecha'}
                    </Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>ETA: {data?.eta ? new Date(data?.eta + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'Sin fecha'}</Text>

                    <Text style={[styles.gridItemFull, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>SKU: {data?.sku}</Text>
                    <Text style={[styles.gridItem, {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "start"
                    }]}>Producto terminado: {Humanize.formatNumber(data?.kg, 2)}</Text>

                </View>
                <View style={[styles.section, {justifyContent: "flex-start"}]}>
                    <Text style={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        marginTop: "4px",
                        textAlign: "flex-start"
                    }}>BOM</Text>
                </View>
                <View style={[styles.gridContainer, {
                    justifyContent: "flex-start",

                }]}>

                    {map(data?.recipe, (item, index) => (<View style={[styles.gridItemFull, {
                        justifyContent: "flex-start", width: "100%", display: "flex", flexDirection: "row",
                    }]}>
                        <Text key={index} style={[styles.gridItemFull, {
                            color: "black",
                            fontSize: "10px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            marginTop: "4px",
                            textAlign: "flex-start",
                        }]}>• {item?.name}</Text>
                        <Text key={index} style={[styles.gridItemFull, {
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            marginTop: "4px",
                            textAlign: "flex-start",
                        }]}>• {Humanize.formatNumber(item?.quantity * data?.kg,4)} {item?.unit}  - S/ {Humanize.formatNumber(item?.price * item?.quantity * data?.kg,4)}                       </Text>

                    </View>))}
                </View>


            </Page>


        </Document>
    </PDFViewer>);
};

export default PDFSell;
