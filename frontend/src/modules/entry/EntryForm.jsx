import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import faces from '../../assets/faces.png';
import TipsContainer from './TipsContainer';


const EntryForm = ({_u_ID, _name}) => {
    const [show, setShow] = useState()
    const redirect = useNavigate();

    const tips = {
        wb: 'On a scale ranging from 0 to 100, with 0 representing the worst day of your life and 100 representing the best.',
        em: 'These are the basic emotions, as per the Gottman Wheel of Emotions. Combinations and varying intensities of these give rise to more intricate emotions.',
        sp: 'Sleep quality can be a factor impacting mood and mental wellbeing.',
        jr: 'Sometimes, writing down potential causes of our emotions can aid in understanding them and developing effective strategies for managing them.'
    }

    const formik = useFormik({
        initialValues: {
            wellbeing: '',
            emotions: [],
            sleep: '',
            journal: '',
            _u_ID: _u_ID
        },
        validationSchema: yup.object({
            wellbeing: yup.number().max(100, "Invalid range").required("Please make a selection"),
            emotions: yup.array().max(3, "Max 3 items").min(1, "Select at least one option"),
            sleep: yup.string().required("Required Field"),
            journal: yup.string().max(300, "Too many characters"),
            _u_ID: yup.string().required()
        }),
        onSubmit: async (values) => {
            if(window.confirm('Submit Entry? You can submit only one entry per day.')){
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
        }
    })
    
  return (
    <>  
        <h2 className="page-title">Welcome back {_name}!</h2>
        <form className='entry-form' onSubmit={formik.handleSubmit}>

            <label 
            htmlFor='wellbeing'
            onClick={() => setShow(show === 'wb' ? '' : 'wb')}
            >How would you rate your overall wellbeing today?</label>
            {formik.touched.wellbeing && formik.errors.wellbeing ? <p>{formik.errors.wellbeing}</p> : null}
            {show === 'wb' ? <TipsContainer tip={tips[show]}/> : null}
            <div className='faces-container'>
                <img id='faces' src={faces}/>
            </div>
            <input
            id="wellbeing"
            name="wellbeing"
            type="range"
            className="wb-slider"
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
            {show === 'em' ? <TipsContainer tip={tips[show]}/> : null}
            
            <div className='em-col'>
                <div className='emotion-cb'>
                    <input
                    id='joy'
                    name="emotions"
                    type="checkbox"
                    value="joy"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="joy">Joy</label>
                </div>

                <div className='emotion-cb'>
                    <input 
                    id="love"
                    name="emotions"
                    type="checkbox"
                    value="love"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="love">Love</label>
                </div>

                <div className='emotion-cb'>
                    <input 
                    id="fear"
                    name="emotions"
                    type="checkbox"
                    value="fear"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="fear">Fear</label>
                </div>

                <div className='emotion-cb'>
                    <input 
                    id="sadness"
                    name="emotions"
                    type="checkbox"
                    value="sadness"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="sadness">Sadness</label>
                </div>

                <div className='emotion-cb'>
                    <input 
                    id="anger"
                    name="emotions"
                    type="checkbox"
                    value="anger"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="anger">Anger</label>
                </div>

                <div className='emotion-cb'>
                    <input 
                    id="surprise"
                    name="emotions"
                    type="checkbox"
                    value="surprise"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="surprise">Suprise</label>
                </div>
            </div>
            
            <label htmlFor="sleep"
            onClick={() => setShow(show === 'sp' ? '' : 'sp')}
            >How did you sleep last night?</label>
            {formik.touched.sleep && formik.errors.sleep ? <p>{formik.errors.sleep}</p> : null}
            {show === 'sp' ? <TipsContainer tip={tips[show]}/> : null}
            <select 
            id="sleep" 
            name='sleep' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
                <option value="" selected disabled hidden>Select one</option>
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
            {show === 'jr' ? <TipsContainer tip={tips[show]}/> : null}
            <textarea 
            id="journal" 
            name="journal"
            cols='50' 
            rows='5' 
            maxLength='300'
            placeholder='300 character max.'
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
