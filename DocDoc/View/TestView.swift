//
//  TestView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation
import SwiftUI

struct TestView: View {
    var body: some View {
        Text("font")
            .font(.largeTitle)
            .fontWeight(.bold)
            .italic()
            .monospaced()
            .underline()
            .strikethrough()
        
        Text("Color")
            .foregroundStyle(.red)
        //  .foregroundStyle(Color.red)
        //  .foregroundStyle(.linearGradient(..))
        //  .foregroundStyle(.primary) из ассетов
        //  .foregroundColor - старый API
    }
    
}

// .font - размер и стиль (.largeTitle, .title, ...)
// .fontWeight - толщина (.bold, .semibold, .regular)
// .bold == .fontWeight(.bold)
// .italic - наклон
// .monospaced() - моноширинный

#Preview {
    TestView()
}
