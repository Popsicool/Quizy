import React from 'react'
import { Stack, useRouter, useSearchParams } from "expo-router";

export const catName = () => {
  return (
    <Stack.Screen
    options={{
          headerStyle: { backgroundColor: "yellow" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
            //   iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
    >
        <View>
            <Text>
                Hello
            </Text>
        </View>

    </Stack.Screen>
  )
}
