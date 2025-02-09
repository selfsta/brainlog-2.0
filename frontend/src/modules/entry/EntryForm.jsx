import { React, useState } from 'react';
import faces from '../../assets/faces.png';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';


const EntryForm = (props) => {
    const [show, setShow] = useState()
    const redirect = useNavigate();

    const formik = useFormik({
        initialValues: {
            wellbeing: '',
            emotions: [],
            sleep: '',
            journal: '',
            _u_ID: props._u_ID
        },
        validationSchema: yup.object({
            wellbeing: yup.number().max(100, "Invalid range").required("Please make a selection"),
            emotions: yup.array().max(3, "Max 3 items").min(1, "Select at least one option"),
            sleep: yup.string().required("Required Field"),
            journal: yup.string().max(300, "Too many characters"),
            _u_ID: yup.string().required()
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('/entry', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(response.status == 200){
                    alert(`Successfully logged entry.`);
                    redirect('/')
                } else {
                    const res = await response.json()
                    alert(`${res.error}: ${response.status}`);
                }
            } catch (error) {
                alert(`Error: ${error}`);
            }
        }
    })
    
  return (
    <>
        <form onSubmit={formik.handleSubmit}>

            <label 
            htmlFor='wellbeing'
            onClick={() => setShow(show === 'wb' ? '' : 'wb')}
            >How would you rate your overall wellbeing today?</label>
            {formik.touched.wellbeing && formik.errors.wellbeing ? <p>{formik.errors.wellbeing}</p> : null}
            {show === 'wb' ? <p>On a scale ranging from 0 to 100, with 0 representing the worst day of your life and 100 representing the best.</p> : null}
            <div className='faces-container'>
                <img id='faces' src={faces}/>
            </div>
            <input
            id="wellbeing"
            name="wellbeing"
            type="range"
            min='0' 
            max='100' 
            step='10'
            value={formik.values.wellbeing}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />

            <label 
            htmlFor='emotions'
            onClick={() => setShow(show === 'em' ? '' : 'em')}
            >Choose up to three emotions that you feel the most strongly.</label>
            {formik.touched.emotions && formik.errors.emotions ? <p>{formik.errors.emotions}</p> : null}
            {show === 'em' ? <p>These are the basic emotions, as per the Gottman Wheel of Emotions. Combinations and varying intensities of these give rise to more intricate emotions. </p> : null}
            <input
            id='joy'
            name="emotions"
            type="checkbox"
            value="joy"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <input 
            id="love"
            name="emotions"
            type="checkbox"
            value="love"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <input 
            id="fear"
            name="emotions"
            type="checkbox"
            value="fear"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <input 
            id="sadness"
            name="emotions"
            type="checkbox"
            value="sadness"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <input 
            id="anger"
            name="emotions"
            type="checkbox"
            value="anger"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <input 
            id="surprise"
            name="emotions"
            type="checkbox"
            value="surprise"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />

            <label htmlFor="sleep"
            onClick={() => setShow(show === 'sp' ? '' : 'sp')}
            >How did you sleep last night?</label>
            {formik.touched.sleep && formik.errors.sleep ? <p>{formik.errors.sleep}</p> : null}
            {show === 'sp' ? <p>Sleep quality can be a factor impacting mood and mental wellbeing.</p> : null}
            <select 
            id="sleep" 
            name='sleep' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
                <option value="100">Excellent</option>
                <option value="80">Great</option>
                <option value="60">Good</option>
                <option value="40">Poorly</option>
                <option value="20">Bad</option>
                <option value="0" >None</option>
            </select>

            <label htmlFor="journal"
            onClick={() => setShow(show === 'jr' ? '' : 'jr')}
            >Use this space to write down anything that might be on your mind today.</label>
            {formik.touched.journal && formik.errors.journal ? <p>{formik.errors.journal}</p> : null}
            {show === 'jr' ? <p>Sometimes, writing down potential causes of our emotions can aid in understanding them and developing effective strategies for managing them.</p> : null}
            <textarea 
            id="journal" 
            name="journal"
            cols='50' 
            rows='5' 
            maxLength='300'
            value={formik.values.journal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />

            <button type="submit" id="submit">
            Log Entry
            </button>

        </form>
    </>
  )
}

export default EntryForm
