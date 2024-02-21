import { Show } from "@refinedev/antd";
import { Card } from "antd";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility/supabaseClient";

interface ShowData {
    work_element: string;
    id: number;
    plan_no: string;
    element_time: string;
    mv: string;
    mod: string;
    model_type: string;
    st: string; 
    code: string;
    symbol: string;
    vp: string;
}

const ShowDetails: React.FC<{ data: ShowData }> = ({ data }) => {
    return (
        <Show>
            <Card>
            <p>Work Element: {data.work_element}</p>
            <p>ID: {data.id}</p>
            <p>Plan Number: {data.plan_no}</p>
            <p>Element Time: {data.element_time}</p>
            <p>MV: {data.mv}</p>
            <p>Mod: {data.mod}</p>
            <p>Model Type: {data.model_type}</p>
            <p>ST: {data.st}</p>
            <p>Code: {data.code}</p>
            <p>Symbol: {data.symbol}</p>
            <p>VP: {data.vp}</p>
            </Card>
        </Show>
    );
};

const smpShow: React.FC<{ data: ShowData }> = ({ data }) => {
    return (
        <div>
            <ShowDetails data={data} />
        </div>
    );
};

export default smpShow;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params } = context;
    const id = params?.id;

    // Fetch data from Supabase for the specific id
    const { data: rowData, error } = await supabaseClient
        .from('Standard Method & Procedure (SMP)')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching data:', error.message);
        return {
            notFound: true, // Return 404 page if data is not found or there's an error
        };
    }

    // Fetch translations for the page
    const translateProps = await serverSideTranslations(context.locale ?? "en", ["common"]);

    return {
        props: {
            data: rowData,
            ...translateProps, // Include translated props
        },
    };
};
