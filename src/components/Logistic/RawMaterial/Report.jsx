import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Humanize from "humanize-plus";
import Logo from '../../../assets/logo.png'
import Firma from '../../../assets/firma1.png'
import Firma2 from '../../../assets/firma2.png'

const styles = StyleSheet.create({
    image: {
        width: 70, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex", justifyContent: "space-around", width: "100%",

        flexDirection: "row",

        borderBottom: "1px"
    }
});
const ReportViewer = ({data}) => {
    return (<PDFViewer style={{width: "100%", height: "100%"}}>
        <Document>
            <Page size="A4" style={{padding: "12px", width: "100%"}}>
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
                    }}>INFORME DE RECEPCIÓN DE MATERIA PRIMA</Text>
                </View>
                <View style={[styles.section, {backgroundColor: "#22c55e"}]}>
                    <Text style={{
                        fontSize: "8px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                        paddingVertical: "2px",
                        textTransform: "uppercase"
                    }}>INFORME {data?.category_name}/{data?.lot} </Text>
                </View>
                <View style={[styles.section, {flexDirection: "column"}]}>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "20%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>A:</Text>
                        <View style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "80%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>
                            <Text style={{fontSize: "12px", fontWeight: "extrabold", fontFamily: "Times-Roman",}}>
                                {data?.provider_name}
                            </Text>
                            <Text style={{fontSize: "12px", fontWeight: "extrabold", fontFamily: "Times-Roman",}}>
                                Proveedor de materia prima
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "20%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>DE:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "80%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "6px"
                        }}>
                            Yamil Wilber Puchoc Rosales
                        </Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "20%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>ASUNTO:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "80%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>
                            Informe de recepción de materia prima - {data?.category_name} ({data?.condition_name})
                        </Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "20%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>FECHA:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "80%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px"
                        }}>
                            {new Date(data?.download_date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                                year: "numeric", month: "long", day: "numeric"
                            })}
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: "10px",
                        fontWeight: "normal",
                        fontFamily: "Times-Roman",
                        width: "100%",
                        paddingHorizontal: "12px",

                        display: "block",
                        borderTopWidth: "1px",
                        paddingVertical: "2px",

                    }}>
                        Estimado(a) {data?.provider_name}; por medio del presente reciban un cordial saludo a nombre del
                        departamento de Logística - Greenbox S.A.C. y a la vez informarles los detalles de la carga
                        recibida. {'\n'}
                        Se recibieron en total <Text style={{fontWeight: "bold"}}>{data?.quantity_boxes} JABAS DE
                        PLÁSTICO</Text> con contenido
                        de {data?.category_name}.
                    </Text>
                    <Text style={{
                        fontSize: "10px",
                        fontWeight: "normal",
                        fontFamily: "Times-Roman",
                        width: "100%",
                        paddingHorizontal: "12px",
                        display: "block",
                        paddingVertical: "2px",
                        color: "red"
                    }}>
                        {data?.description}
                    </Text>
                    <Text style={{
                        fontSize: "10px",
                        fontWeight: "normal",
                        fontFamily: "Times-Roman",
                        width: "100%",
                        paddingHorizontal: "12px",
                        display: "block",
                        paddingVertical: "2px",

                    }}>
                        {data?.discount_description}
                    </Text>
                    <Text style={{
                        fontSize: "10px",
                        fontWeight: "normal",
                        fontFamily: "Times-Roman",
                        width: "100%",
                        paddingHorizontal: "12px",
                        display: "block",
                        paddingVertical: "2px",

                    }}>
                        El área de Control de Calidad tomó {data?.quality} kg para su análisis y verificación de
                        calidad.
                    </Text>
                </View>
                <View style={[styles.section, {
                    paddingVertical: "2px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderBottomWidth: "0px",
                }]}>
                    <View style={{
                        display: "flex", width: "100%", paddingVertical: "2px"
                    }}>
                        <Text style={{
                            fontSize: "12px", fontWeight: "extrabold", fontFamily: "Times-Roman", textAlign: "start",
                        }}>1. DATOS GENERALES</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",

                        }}>FECHA DEL PUNTO DE PARTIDA:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",
                        }}>{new Date(data?.departure_date).toLocaleDateString('es-PE', {
                            year: "numeric", day: "numeric", month: "long"
                        })}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",

                        }}>FECHA DE DESCARGA:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",
                        }}>{new Date(data?.download_date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                            year: "numeric", day: "numeric", month: "long"
                        })}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",

                        }}>PROVEEDOR:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",
                        }}>{data?.provider_name}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",

                        }}>GUIA DE REMISIÓN:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",
                        }}>{data?.provider_guide}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",

                        }}>PARCELAS:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",
                        }}>{data?.parcels_name}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",

                        }}>LOTE GB:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "50%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "1px",
                            borderWidth: "1px",
                        }}>{data?.lot}</Text>
                    </View>
                </View>
                <View style={[styles.section, {
                    paddingVertical: "2px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderBottomWidth: "0px",
                }]}>
                    <View style={{
                        display: "flex", width: "100%", paddingVertical: "6px"
                    }}>
                        <Text style={{
                            fontSize: "12px", fontWeight: "extrabold", fontFamily: "Times-Roman", textAlign: "start",
                        }}>2. RECEPCIÓN</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",

                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"

                        }}>TOTAL PESO GUÍA:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"
                        }}>{Humanize.formatNumber(data?.guide_weight, 2)}</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"
                        }}>KG</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"

                        }}>TOTAL PESO BRUTO:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"
                        }}>{Humanize.formatNumber(data?.brute_weight, 2)}</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"
                        }}>KG</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"

                        }}>TOTAL PESO NETO:</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"
                        }}>{Humanize.formatNumber(data?.net_weight, 2)}</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "30%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "2px",
                            borderWidth: "1px",
                            textAlign: "center",
                            backgroundColor: "#4ade80"
                        }}>KG</Text>
                    </View>

                </View>

                <View style={[styles.section, {
                    paddingVertical: "2px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderBottomWidth: "0px",
                }]}>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: "10px"
                    }}>
                        <View style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "44%",
                            display: "inline-block",

                            textAlign: "center",
                            gap: "4px"

                        }}>
                            <View style={{borderWidth: "1px",}}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    borderBottomWidth: "1px",
                                    backgroundColor: "#4ade80",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE JABAS</Text>
                                    <Text>{data?.quantity_boxes}</Text>
                                </View>
                                {data?.boxes?.box_gb > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE J. GB</Text>
                                    <Text>{data?.boxes?.box_gb}</Text>
                                </View>}
                                {data?.boxes?.box_pa > 0 &&

                                    <View style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        width: "100%",
                                        padding: "4px"
                                    }}>
                                        <Text>TOTAL DE J. PAE</Text>
                                        <Text>{data?.boxes?.box_pa}</Text>
                                    </View>}
                                {data?.boxes?.box_co > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE J. COLORES</Text>
                                    <Text>{data?.boxes?.box_co}</Text>
                                </View>}
                                {data?.boxes?.box_t0 > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE J. TIBANA </Text>
                                    <Text>{data?.boxes?.box_t0}</Text>
                                </View>}
                                {data?.boxes?.box_t1 > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE J. TIBANA I</Text>
                                    <Text>{data?.boxes?.box_t1}</Text>
                                </View>}
                                {data?.boxes?.box_t2 > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE J. TIBANA II</Text>
                                    <Text>{data?.boxes?.box_t2}</Text>
                                </View>}
                                {data?.boxes?.box_gn > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE J. GANDULES</Text>
                                    <Text>{data?.boxes?.box_gn}</Text>
                                </View>}
                                {data?.boxes?.box_ma > 0 &&

                                    <View style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        width: "100%",
                                        padding: "4px"
                                    }}>
                                        <Text>TOTAL DE J. MADERA</Text>
                                        <Text>{data?.boxes?.box_ma}</Text>
                                    </View>}
                                {data?.boxes?.box_industry > 0 &&

                                    <View style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        width: "100%",
                                        padding: "4px"
                                    }}>
                                        <Text>TOTAL DE J. INDUSTRIALES</Text>
                                        <Text>{data?.boxes?.box_industry}</Text>
                                    </View>}

                            </View>
                            <View style={{borderWidth: "1px",}}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    borderBottomWidth: "1px",
                                    backgroundColor: "#4ade80",
                                    padding: "4px"
                                }}>
                                    <Text>OBSERVACIÓN</Text>
                                    <Text>KG</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL PESO NETO</Text>
                                    <Text>{Humanize.formatNumber(data?.net_weight, 2)}</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>KG DESCONTADOS ({Humanize.formatNumber(data?.discount, 2)}%)</Text>
                                    <Text>{Humanize.formatNumber(data?.discount_net_kg, 2)}</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px",
                                    borderTopWidth: "1px",
                                    backgroundColor: "#fbbf24"
                                }}>
                                    <Text>TOTAL PESO NETO A PAGAR</Text>
                                    <Text>{Humanize.formatNumber(data?.amount_net_kg, 2)}</Text>
                                </View>

                            </View>
                        </View>
                        <View style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "44%",
                            display: "inline-block",

                            textAlign: "center",
                            gap: "4px"

                        }}>
                            <View style={{borderWidth: "1px",}}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    borderBottomWidth: "1px",
                                    backgroundColor: "#4ade80",
                                    padding: "4px"
                                }}>
                                    <Text>ITEM</Text>
                                    <Text>Cant.</Text>
                                </View>
                                {data?.pallets?.Azul > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE PAR. AZUL</Text>
                                    <Text>{data?.pallets?.Azul}</Text>
                                </View>}
                                {data?.pallets?.Verde > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE PAR. VERDES</Text>
                                    <Text>{data?.pallets?.Verde}</Text>
                                </View>}
                                {data?.pallets?.Negro > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE PAR. NEGRAS</Text>
                                    <Text>{data?.pallets?.Negro}</Text>
                                </View>}
                                {data?.pallets?.Celeste > 0 && <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",

                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE PAR. CELESTE</Text>
                                    <Text>{data?.pallets?.Celeste}</Text>
                                </View>}
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#4ade80",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE PARIHUELAS</Text>
                                    <Text>{data?.quantity_pallets}</Text>
                                </View>

                            </View>
                            <View style={{borderWidth: "1px",}}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    borderBottomWidth: "1px",
                                    backgroundColor: "#4ade80",
                                    padding: "4px"
                                }}>
                                    <Text>ITEM</Text>
                                    <Text>KG</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px"
                                }}>
                                    <Text>TOTAL DE JABAS</Text>
                                    <Text>{Humanize.formatNumber(data?.weight_boxes, 2)}</Text>
                                </View>

                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px",


                                }}>
                                    <Text>TOTAL DE PARIHUELAS</Text>
                                    <Text>{Humanize.formatNumber(data?.weight_pallets, 2)}</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "100%",
                                    padding: "4px",
                                    borderTopWidth: "1px",
                                    backgroundColor: "#4ade80"
                                }}>
                                    <Text>TOTAL</Text>
                                    <Text>{Humanize.formatNumber(data?.total_tare, 2)}</Text>
                                </View>

                            </View>
                        </View>


                    </View>
                    <View style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                        alignItems: "center",
                        maxHeight: "80px",
                        backgroundColor: "white"
                    }}>
                        <Image
                            style={{
                                width: 120, backgroundColor: "white",
                            }}
                            src={Firma}
                        />
                        <Image
                            style={{

                                width: 120, backgroundColor: "white",
                            }}
                            src={Firma2}
                        />
                    </View>
                </View>


            </Page>


        </Document>
    </PDFViewer>);
};

export default ReportViewer;
