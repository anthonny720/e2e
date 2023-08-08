import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer';
import Logo from '../../assets/logo.png';


const styles = StyleSheet.create({
    image: {
        width: 70, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex", justifyContent: "space-around", width: "100%", flexDirection: "row", borderBottom: "1px",
    }, label: {
        fontSize: "12px",
        fontWeight: "extra-bold",
        fontFamily: "Times-Roman",
        textAlign: "center",
        color: "black",
        paddingVertical: "2px",
        textTransform: "uppercase",
    }, value: {
        fontSize: "8px",
        fontWeight: "bold",
        color: "black",
        paddingVertical: "2px",
        textTransform: "uppercase",
        marginVertical: "4px",

    }
});

// define un componente para renderizar un campo de etiqueta-valor
const Field = ({label, value}) => (<View style={{display: "flex", marginBottom: "4px"}}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
</View>);

// define el componente que representa el formulario
const RequestDocument = ({data}) => (<PDFViewer style={{width: "100%", height: "100%",}}>
    <Document>
        <Page size="A4" style={{padding: "24px", width: "100%",}}>
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
                    fontSize: "18px", fontWeight: "extrabold", fontFamily: "Times-Roman",
                }}>SOLICITUD DE MUESTRAS</Text>
            </View>
            <View style={[styles.section, {backgroundColor: "#22c55e"}]}>
                <Text style={{
                    fontSize: "8px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    paddingVertical: "2px",
                    textTransform: "uppercase"
                }}>{data?.code} </Text>
            </View>
            <View style={[styles.section, {
                borderBottomWidth: "0px",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "col",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            }]}>
                <Field label="Fecha de solicitud"
                       value={new Date(data?.date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                           year: "numeric", month: "long", day: "numeric", timeZone: "America/Lima"
                       })}/>
                <Field label="Fecha de entrega(Lima)"
                       value={new Date(data?.delivery_date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                           year: "numeric", month: "long", day: "numeric", timeZone: "America/Lima"
                       })}/>
                <Field label="Solicitante" value={data?.applicant}/>
                <Field label="Producto" value={data?.product}/>
                <Field label="Uso previsto" value={data?.use ? data?.use : ''}/>
                <Field label="Especificaciones" value={data?.specifications}/>
                <Field label="Análisis" value={data?.analysis}/>
                <Field label="Dirección de entrega" value={data?.delivery_address}/>
                <Field label="Dirección de entrega final" value={data?.delivery_address_final}/>
                <Field label="Datos del cliente" value={data?.client_data}/>
                <Field label="Tipo de empaque" value={data?.packing_type_name}/>
                <Field label="Mercado" value={data?.market_name}/>
                <Field label="Precio" value={`S/. ${data?.price}`}/>
                <Field label="Courier" value={data?.courier}/>

                <Field label="Comentarios" value={data?.comments}/>

            </View>
        </Page>
    </Document>
</PDFViewer>);

export default RequestDocument;
