import axios from 'axios'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const Pay = () => {
    const baseURL = 'https://emi-api-production.up.railway.app/api/pays'

    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0.0)
    const [comment, setComment] = useState('')

    const [paying, setPaying] = useState(false)

    const [successPay, setSuccessPay] = useState(false)

    const handlePay = () => {
        const data = {
            name,
            amount,
            comment,
        }

        // console.log(data)
        if (!name || !amount) {
            alert('Por favor ingrese todos los datos')
            return
        }
        axios.post(baseURL, data)
            .then(res => {
                console.log(res.data)
                setName('')
                setAmount(0)
                setComment('')
                setSuccessPay(true)
            }
            )
            .catch(err => console.error(err))
            .finally(() => setPaying(false))
    }

    return (
        <>
            <Card title="Pagar  a Emilia Laz Salazar"
                subTitle="Ingrese los datos"
                style={{
                    width: '25rem', margin: 'auto', marginTop: '20px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '20px', borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
            >
                <InputText
                    className='p-inputtext-lg p-d-block p-mb-2'
                    style={{ width: '100%', margin: '1rem 0' }}
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    type="text"
                />

                <InputNumber inputId="currency-us"
                    value={amount}
                    onValueChange={(e) => setAmount(e.value)}
                    mode="currency" currency="USD" locale="en-US"
                    className='p-inputtext-lg p-d-block p-mb-2'
                />


                <InputText
                    className='p-inputtext-lg p-d-block p-mb-2'
                    style={{ width: '100%', margin: '1rem 0' }}
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    placeholder="Comentario"
                    type="text"
                />

                <Button
                    label={paying ? 'Pagando...' : 'Pagar'}
                    // icon="pi pi-check"
                    style={{ width: '100%', margin: '1rem 0' }}
                    className="p-button-lg p-button-success"
                    onClick={handlePay}
                    disabled={paying}
                />

            </Card>
            {/* mensaje en un modal que indique que ya se pagó correctamente */}
            <Dialog header="Pago exitoso"
                visible={successPay}
                style={{ width: '50vw' }}
                onHide={() => setSuccessPay(false)}
            >
                <p>El pago se realizó correctamente</p>
            </Dialog>

        </>
    )
}

export default Pay