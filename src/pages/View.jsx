import React from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Dialog } from 'primereact/dialog'
import QRCode from "react-qr-code";

// const baseURL = 'http://localhost:9000/api/pays'
const baseURL = 'https://emi-api-production.up.railway.app/api/pays'

const View = () => {

    const urlToPay = 'http://localhost:9000/'

    const [qrVisible, setQrVisible] = useState(false)

    const [pays, setPays] = useState([])
    const [loading, setLoading] = useState(true)

    const [total, setTotal] = useState(0)

    const sumar = () => {
        let total = 0
        pays.forEach(pay => {
            total += Number(pay.amount)
        })
        setTotal(total.toFixed(2))
    }

    const updatePays = () => {
        axios.get(baseURL)
            .then(res => {
                setPays(res.data)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        updatePays()
    }, [])

    useEffect(() => {
        sumar()
    }, [pays])

    return (
        <>

            <Card
                title="Total:"
                style={{
                    position: 'relative',
                    width: '80%', margin: 'auto', marginTop: '20px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '20px', borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
            >
                <span
                    style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        // color: 'blue',
                        textAlign: 'center',
                    }}
                >${total}</span>
                <br />
                <br />
                <Button label="Actualizar" icon="pi pi-refresh"
                    style={{
                        backgroundColor: 'blue', color: 'white',
                    }}
                    onClick={updatePays}
                />
                {/* qr code that containst this web url */}
                <Button label="QR" icon="pi pi-qrcode"
                    style={{
                        backgroundColor: 'green', color: 'white',
                        // width: '100%', margin: '1rem 0'
                        position: 'absolute', right: '1rem', top: '1rem'

                    }}
                    // className='p-button-raised p-button-rounded p-button-text p-button-lg p-mt-2 p-ml-2 p-mb-2 p-button-success'
                    onClick={() => setQrVisible(true)}
                />

            </Card>
            <br />

            <Card subTitle="Lista de Pagos"
                style={{
                    width: '100%',
                    margin: 'auto', marginTop: '20px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '1rem', borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
            >
                <DataTable value={pays}>
                    <Column field="date" header="Fecha"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="amount" header="Valor"></Column>
                    <Column field="comment" header="Motivo"></Column>
                </DataTable>
            </Card>
            <Dialog
                header="Código QR"
                visible={qrVisible}
                style={{
                    width: '90vw',
                }}
                onHide={() => setQrVisible(false)}
            >
                <div style={{ textAlign: 'center' }}>
                    <p>Escanea el código QR para acceder a la página de pagos</p>
                    <p>{urlToPay}</p>
                    <br />
                    {/* <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://localhost:9000/" alt="qr code" /> */}
                    <QRCode value={urlToPay} size={250} />
                </div>
            </Dialog>

        </>
    )
}

export default View