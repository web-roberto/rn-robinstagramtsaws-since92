import { View, Text,TextInput} from 'react-native'
import React from 'react'
import {Controller,Control} from 'react-hook-form'

import colors from '../../theme/colors'
import styles from './styles'
import { User } from '../../API'

type IEditableUSerFiels='username' | 'name' |'bio' |'website'
export type IEditableUSer= Pick<User,IEditableUSerFiels>;

interface ICustomInput {
    control:Control<IEditableUSer, object>;
    label:string;
    name:IEditableUSerFiels;
    multiline?:boolean;
    rules?:object;
}

const CustomInput=({control,name,label,multiline=false,rules={}}:ICustomInput)=>(
    <Controller control={control} name={name} rules={rules} 
    render={({field:{onChange, value,onBlur},fieldState:{error}})=>{
    return(        
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={{flex:1}}>
            <TextInput placeholder={label} style={[styles.input,{borderColor: error?colors.error:colors.border}]} 
            multiline={multiline}
            onChangeText={onChange}
            value={value||''}
            onBlur={onBlur}
            />
            {/* He substituido error.type (errores por defecto) por error.message (errores personalizados) */}
            {error && <Text style={{color:colors.error}}>{error.message}</Text>}
        </View>
    </View>
    );}} />
);
export default CustomInput